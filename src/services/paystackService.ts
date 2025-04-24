import { db } from '@/lib/firebase';
import { collection, doc, getDoc, updateDoc, setDoc, where, query, getDocs } from 'firebase/firestore';
import { PaymentStatus, OrderStatus } from '@/services/firestoreService';

// Types
export interface PaymentInitiationData {
  amount: number;
  email: string;
  userId: string;
  orderId?: string;
  metadata?: Record<string, any>;
  callbackUrl?: string;
}

export interface PaymentVerificationData {
  reference: string;
}

// Constants
const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const PAYSTACK_API_URL = 'https://api.paystack.co';

// Debug environment variables
console.log('Paystack Public Key:', PAYSTACK_PUBLIC_KEY ? 'Loaded' : 'Not loaded');
console.log('Paystack Secret Key:', PAYSTACK_SECRET_KEY ? 'Loaded' : 'Not loaded');

// Helper functions
const generateReference = (): string => {
  return `GRN-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

// Main service
export const paystackService = {
  // Initialize a payment
  initiatePayment: async (data: PaymentInitiationData): Promise<{ authorizationUrl: string; reference: string }> => {
    try {
      if (!PAYSTACK_SECRET_KEY) {
        throw new Error('Paystack Secret Key is not configured');
      }

      const reference = generateReference();
      
      // Create a payment record in Firestore
      const paymentRef = doc(collection(db, 'payments'));
      
      // Ensure metadata is an object with no undefined values
      const cleanMetadata = {};
      if (data.metadata) {
        Object.entries(data.metadata).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            cleanMetadata[key] = value;
          }
        });
      }
      
      await setDoc(paymentRef, {
        id: paymentRef.id,
        userId: data.userId,
        amount: data.amount / 100, // Convert from kobo to naira
        currency: 'GHS', // Changed to Ghana Cedis
        status: PaymentStatus.PENDING,
        reference,
        orderId: data.orderId || null,
        metadata: cleanMetadata,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Prepare metadata for Paystack API
      const paystackMetadata = {
        userId: data.userId,
      };
      
      if (data.orderId) {
        paystackMetadata['orderId'] = data.orderId;
      }
      
      // Add any other metadata that exists
      if (data.metadata) {
        Object.entries(data.metadata).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            paystackMetadata[key] = value;
          }
        });
      }
      
      // Make API call to Paystack to initialize payment
      const response = await fetch(`${PAYSTACK_API_URL}/transaction/initialize`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          amount: data.amount, // Amount in pesewas (smallest currency unit)
          reference,
          callback_url: data.callbackUrl || window.location.origin + '/payment/verify',
          currency: 'GHS', // Changed to Ghana Cedis
          metadata: paystackMetadata,
        }),
      });
      
      const result = await response.json();
      
      if (!result.status) {
        console.error('Paystack error:', result);
        throw new Error(result.message || 'Failed to initialize payment');
      }
      
      return {
        authorizationUrl: result.data.authorization_url,
        reference,
      };
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },
  
  // Verify a payment
  verifyPayment: async (data: PaymentVerificationData): Promise<{ status: PaymentStatus; data: any }> => {
    try {
      if (!PAYSTACK_SECRET_KEY) {
        throw new Error('Paystack Secret Key is not configured');
      }
      
      // Make API call to Paystack to verify payment
      const response = await fetch(`${PAYSTACK_API_URL}/transaction/verify/${data.reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (!result.status) {
        throw new Error(result.message || 'Failed to verify payment');
      }
      
      const paymentStatus: PaymentStatus = result.data.status === 'success' ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
      
      // Find the payment in Firestore
      const paymentsRef = collection(db, 'payments');
      const q = query(paymentsRef, where('reference', '==', data.reference));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Payment not found');
      }
      
      const paymentDoc = querySnapshot.docs[0];
      const paymentId = paymentDoc.id;
      
      // Update payment record in Firestore
      await updateDoc(doc(db, 'payments', paymentId), {
        status: paymentStatus,
        paystackRef: result.data.reference,
        metadata: {
          paystackResponse: JSON.stringify(result.data),
        },
        updatedAt: new Date()
      });
      
      // If payment is successful and there's an order, update order status
      if (paymentStatus === PaymentStatus.SUCCESS) {
        const payment = paymentDoc.data();
        
        if (payment?.orderId) {
          await updateDoc(doc(db, 'orders', payment.orderId), { 
            status: OrderStatus.PROCESSING,
            updatedAt: new Date()
          });
        }
      }
      
      return {
        status: paymentStatus,
        data: result.data,
      };
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
  
  // Get payment details
  getPaymentDetails: async (reference: string): Promise<any> => {
    try {
      // Find the payment in Firestore
      const paymentsRef = collection(db, 'payments');
      const q = query(paymentsRef, where('reference', '==', reference));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Payment not found');
      }
      
      const paymentDoc = querySnapshot.docs[0];
      const payment = paymentDoc.data();
      
      // Get user and order details if needed
      let user = null;
      let order = null;
      
      if (payment.userId) {
        const userDoc = await getDoc(doc(db, 'users', payment.userId));
        if (userDoc.exists()) {
          user = userDoc.data();
        }
      }
      
      if (payment.orderId) {
        const orderDoc = await getDoc(doc(db, 'orders', payment.orderId));
        if (orderDoc.exists()) {
          order = orderDoc.data();
        }
      }
      
      return {
        ...payment,
        user,
        order
      };
    } catch (error) {
      console.error('Error getting payment details:', error);
      throw error;
    }
  },
  
  // Get Paystack public key
  getPublicKey: (): string => {
    if (!PAYSTACK_PUBLIC_KEY) {
      console.error('Paystack Public Key is not configured');
      return '';
    }
    return PAYSTACK_PUBLIC_KEY;
  },
};

// Client-side Paystack helper
export const initializePaystackPayment = (
  data: {
    email: string;
    amount: number; // Amount in Ghana Cedis
    reference: string;
    onSuccess: (reference: string) => void;
    onCancel: () => void;
  }
) => {
  if (!PAYSTACK_PUBLIC_KEY) {
    console.error('Paystack Public Key is not configured');
    return;
  }

  // @ts-ignore - PaystackPop is loaded from the Paystack script
  const handler = window.PaystackPop?.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: data.email,
    amount: data.amount * 100, // Convert to pesewas
    currency: 'GHS', // Ghana Cedis
    ref: data.reference,
    onClose: () => {
      data.onCancel();
    },
    callback: (response: any) => {
      data.onSuccess(response.reference);
    },
  });
  
  if (handler) {
    handler.openIframe();
  } else {
    console.error('PaystackPop not available. Make sure the Paystack script is loaded.');
  }
};
