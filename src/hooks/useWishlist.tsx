import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { useAuthContext } from '@/hooks/useAuthContext';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, userId } = useAuthContext();

  // Load wishlist from Firestore when user authentication state changes
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated && userId) {
          console.log('Loading wishlist for user:', userId);
          
          // Get user's wishlist from Firestore
          const wishlistRef = collection(db, 'wishlists');
          const q = query(wishlistRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          
          const wishlistItems: Product[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            wishlistItems.push(data.product as Product);
          });
          
          setItems(wishlistItems);
          console.log('Wishlist loaded with', wishlistItems.length, 'items');
        } else {
          // Clear wishlist when user is not authenticated
          setItems([]);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [isAuthenticated, userId]);

  const addItem = async (product: Product) => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot add to wishlist: User not authenticated');
      return;
    }

    try {
      // Check if product already exists in wishlist
      if (items.some(item => item.id === product.id)) {
        return;
      }

      // Add to Firestore
      const wishlistItemRef = doc(collection(db, 'wishlists'));
      await setDoc(wishlistItemRef, {
        id: wishlistItemRef.id,
        userId: userId,
        productId: product.id,
        product: product,
        createdAt: new Date()
      });

      // Update local state
      setItems(prevItems => [...prevItems, product]);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const removeItem = async (productId: string) => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot remove from wishlist: User not authenticated');
      return;
    }

    try {
      // Find the wishlist item in Firestore
      const wishlistRef = collection(db, 'wishlists');
      const q = query(
        wishlistRef, 
        where('userId', '==', userId),
        where('productId', '==', productId)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Delete each matching document
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);

      // Update local state
      setItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot clear wishlist: User not authenticated');
      return;
    }

    try {
      // Find all user's wishlist items
      const wishlistRef = collection(db, 'wishlists');
      const q = query(wishlistRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      // Delete each document
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);

      // Clear local state
      setItems([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  const value = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    isLoading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
