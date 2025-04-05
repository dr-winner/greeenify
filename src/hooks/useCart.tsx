
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  shippingCost: number;
  itemCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const shippingCost = 50.00; // Fixed shipping cost in GHS
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('greenify-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse saved cart', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('greenify-cart', JSON.stringify(items));
    
    // Calculate subtotal
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    setSubtotal(newSubtotal);
    
    // Calculate total (subtotal + shipping)
    setTotal(newSubtotal + (newSubtotal > 0 ? shippingCost : 0));
  }, [items, shippingCost]);
  
  // Sync cart with backend (real implementation)
  useEffect(() => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken && items.length > 0) {
      // We'd normally call our backend to sync the cart
      fetch('https://api.yourbackend.com/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          items: items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      }).catch(error => {
        console.error('Failed to sync cart with backend:', error);
      });
    }
  }, [items]);
  
  const addItem = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      // Check if product already exists in cart
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // If product exists, update quantity
        const newItems = [...currentItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // If product doesn't exist, add new item
        return [...currentItems, { product, quantity }];
      }
    });
  };
  
  const removeItem = (productId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
    );
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    
    // Clear cart in backend as well
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      fetch('https://api.yourbackend.com/api/cart/clear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      }).catch(error => {
        console.error('Failed to clear cart in backend:', error);
      });
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
