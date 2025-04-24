import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserRole } from '@/types/user';

// Type definitions based on previous Prisma schema
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  reference: string;
  paystackRef?: string;
  metadata?: any;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Helper to convert Firestore timestamps to Date objects
const convertTimestamps = (data: any) => {
  const result = { ...data };
  
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate();
    }
  });
  
  return result;
};

// User service
export const userService = {
  // Get a user by ID
  getUser: async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          id: userDoc.id,
          ...convertTimestamps(userData)
        } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },
  
  // Get a user by email
  getUserByEmail: async (email: string): Promise<User | null> => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        return {
          id: userDoc.id,
          ...convertTimestamps(userData)
        } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },
  
  // Update a user
  updateUser: async (userId: string, data: Partial<User>): Promise<void> => {
    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(doc(db, 'users', userId), updateData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Order service
export const orderService = {
  // Create a new order
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    try {
      const orderRef = doc(collection(db, 'orders'));
      
      const newOrder = {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(orderRef, newOrder);
      
      // Get the created order with ID
      const orderDoc = await getDoc(orderRef);
      const order = orderDoc.data();
      
      return {
        id: orderRef.id,
        ...convertTimestamps(order)
      } as Order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  // Get an order by ID
  getOrder: async (orderId: string): Promise<Order | null> => {
    try {
      const orderDoc = await getDoc(doc(db, 'orders', orderId));
      
      if (orderDoc.exists()) {
        const orderData = orderDoc.data();
        
        return {
          id: orderDoc.id,
          ...convertTimestamps(orderData)
        } as Order;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },
  
  // Get orders by user ID
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      
      querySnapshot.forEach(doc => {
        const orderData = doc.data();
        
        orders.push({
          id: doc.id,
          ...convertTimestamps(orderData)
        } as Order);
      });
      
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  },
  
  // Update an order
  updateOrder: async (orderId: string, data: Partial<Order>): Promise<void> => {
    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(doc(db, 'orders', orderId), updateData);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
};

// Payment service
export const paymentService = {
  // Create a new payment
  createPayment: async (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payment> => {
    try {
      const paymentRef = doc(collection(db, 'payments'));
      
      const newPayment = {
        ...paymentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(paymentRef, newPayment);
      
      // Get the created payment with ID
      const paymentDoc = await getDoc(paymentRef);
      const payment = paymentDoc.data();
      
      return {
        id: paymentRef.id,
        ...convertTimestamps(payment)
      } as Payment;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },
  
  // Get a payment by ID
  getPayment: async (paymentId: string): Promise<Payment | null> => {
    try {
      const paymentDoc = await getDoc(doc(db, 'payments', paymentId));
      
      if (paymentDoc.exists()) {
        const paymentData = paymentDoc.data();
        
        return {
          id: paymentDoc.id,
          ...convertTimestamps(paymentData)
        } as Payment;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting payment:', error);
      throw error;
    }
  },
  
  // Get a payment by reference
  getPaymentByReference: async (reference: string): Promise<Payment | null> => {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(paymentsRef, where('reference', '==', reference), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const paymentDoc = querySnapshot.docs[0];
        const paymentData = paymentDoc.data();
        
        return {
          id: paymentDoc.id,
          ...convertTimestamps(paymentData)
        } as Payment;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting payment by reference:', error);
      throw error;
    }
  },
  
  // Get payments by user ID
  getUserPayments: async (userId: string): Promise<Payment[]> => {
    try {
      const paymentsRef = collection(db, 'payments');
      const q = query(
        paymentsRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const payments: Payment[] = [];
      
      querySnapshot.forEach(doc => {
        const paymentData = doc.data();
        
        payments.push({
          id: doc.id,
          ...convertTimestamps(paymentData)
        } as Payment);
      });
      
      return payments;
    } catch (error) {
      console.error('Error getting user payments:', error);
      throw error;
    }
  },
  
  // Update a payment
  updatePayment: async (paymentId: string, data: Partial<Payment>): Promise<void> => {
    try {
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(doc(db, 'payments', paymentId), updateData);
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }
};
