import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { useAuthContext } from '@/hooks/useAuthContext';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: number;
  total: number;
  shippingCost: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, userId } = useAuthContext();
  const shippingCost = 0; // Free shipping
  
  // Load cart from Firestore when user authentication state changes
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated && userId) {
          console.log('Loading cart for user:', userId);
          
          // Get user's cart from Firestore
          const cartRef = collection(db, 'carts');
          const q = query(cartRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          
          const cartItems: CartItem[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            cartItems.push({
              product: data.product as Product,
              quantity: data.quantity
            });
          });
          
          setItems(cartItems);
          console.log('Cart loaded with', cartItems.length, 'items');
        } else {
          // Clear cart when user is not authenticated
          setItems([]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, userId]);
  
  // Calculate subtotal and total whenever items change
  useEffect(() => {
    // Calculate subtotal
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    setSubtotal(newSubtotal);
    
    // Calculate total (subtotal + shipping)
    // Since shipping is free, total equals subtotal
    setTotal(newSubtotal);
  }, [items]);
  
  const addItem = async (product: Product, quantity = 1) => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot add to cart: User not authenticated');
      return;
    }

    try {
      // Check if product already exists in cart
      const existingItemIndex = items.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // If product exists, update quantity in Firestore
        const cartRef = collection(db, 'carts');
        const q = query(
          cartRef, 
          where('userId', '==', userId),
          where('productId', '==', product.id)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const cartItemDoc = querySnapshot.docs[0];
          const newQuantity = items[existingItemIndex].quantity + quantity;
          
          await updateDoc(cartItemDoc.ref, {
            quantity: newQuantity,
            updatedAt: new Date()
          });
          
          // Update local state
          const newItems = [...items];
          newItems[existingItemIndex].quantity = newQuantity;
          setItems(newItems);
        }
      } else {
        // If product doesn't exist, add new item to Firestore
        const cartItemRef = doc(collection(db, 'carts'));
        await setDoc(cartItemRef, {
          id: cartItemRef.id,
          userId: userId,
          productId: product.id,
          product: product,
          quantity: quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        // Update local state
        setItems(prevItems => [...prevItems, { product, quantity }]);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  const removeItem = async (productId: string) => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot remove from cart: User not authenticated');
      return;
    }

    try {
      // Find the cart item in Firestore
      const cartRef = collection(db, 'carts');
      const q = query(
        cartRef, 
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
      setItems(currentItems => 
        currentItems.filter(item => item.product.id !== productId)
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot update cart: User not authenticated');
      return;
    }

    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }
      
      // Find the cart item in Firestore
      const cartRef = collection(db, 'carts');
      const q = query(
        cartRef, 
        where('userId', '==', userId),
        where('productId', '==', productId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const cartItemDoc = querySnapshot.docs[0];
        
        await updateDoc(cartItemDoc.ref, {
          quantity: quantity,
          updatedAt: new Date()
        });
        
        // Update local state
        setItems(currentItems => 
          currentItems.map(item => 
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };
  
  const clearCart = async () => {
    if (!isAuthenticated || !userId) {
      console.error('Cannot clear cart: User not authenticated');
      return;
    }

    try {
      // Find all user's cart items
      const cartRef = collection(db, 'carts');
      const q = query(cartRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      // Delete each document
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      
      // Clear local state
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    total,
    shippingCost,
    itemCount,
    isLoading
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
