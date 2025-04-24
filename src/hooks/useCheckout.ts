import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';
import { useAuthContext } from '@/hooks/useAuthContext';
import { CheckoutData, CompleteCheckoutData, DeliveryOption } from '@/components/checkout/types';
import { deliveryOptions } from '@/components/checkout/data';
import { paystackService } from '@/services/paystackService';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

export const useCheckout = (onComplete?: () => void) => {
  const [activeStep, setActiveStep] = useState<'shipping' | 'payment'>('shipping');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Create the initial shipping info object - simplified to just name and phone
  const initialShippingInfo = {
    fullName: '',
    phoneNumber: '',
    // These fields are still in the type but we don't require user input
    address: 'Store Pickup',
    city: 'N/A',
    region: 'N/A',
    postalCode: 'N/A',
  };
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingInfo: initialShippingInfo,
    shippingAddress: initialShippingInfo,
    deliveryOption: 'pickup', // Default to store pickup
    paymentMethod: 'paystack',
  });
  
  const { toast } = useToast();
  const { items, subtotal, total, shippingCost, clearCart } = useCart();
  const { isAuthenticated, userName, userId } = useAuthContext();
  const navigate = useNavigate();
  
  // Load user details when component mounts
  useEffect(() => {
    if (isAuthenticated && userName) {
      const updatedShippingInfo = {
        ...checkoutData.shippingInfo,
        fullName: userName || '',
      };
      
      setCheckoutData(prev => ({
        ...prev,
        shippingInfo: updatedShippingInfo,
        shippingAddress: updatedShippingInfo,
      }));
    }
  }, [isAuthenticated, userName]);
  
  const selectedDeliveryOption = deliveryOptions.find(option => option.id === checkoutData.deliveryOption);
  
  const handleUpdateCheckoutData = (data: Partial<CheckoutData>) => {
    // If shippingInfo is being updated, also update shippingAddress to keep them in sync
    if (data.shippingInfo) {
      data.shippingAddress = data.shippingInfo;
    }
    
    setCheckoutData(prev => ({
      ...prev,
      ...data,
    }));
  };
  
  // Check if all required fields are filled - now only name and phone
  const isFormComplete = (): boolean => {
    const { shippingInfo } = checkoutData;
    if (!shippingInfo.fullName || !shippingInfo.phoneNumber) {
      return false;
    }
    
    return true;
  };
  
  const prepareCompleteCheckoutData = (): CompleteCheckoutData => {
    // Create a deep copy to avoid modifying the original
    const completeData = JSON.parse(JSON.stringify(checkoutData)) as CompleteCheckoutData;
    return completeData;
  };
  
  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!isFormComplete()) {
      toast({
        title: "Missing Information",
        description: "Please provide your full name and phone number to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create order in Firestore
      const orderRef = doc(collection(db, 'orders'));
      const orderData = {
        id: orderRef.id,
        userId: userId,
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image
        })),
        shippingInfo: checkoutData.shippingInfo,
        deliveryOption: 'pickup', // Always store pickup
        paymentMethod: 'paystack',
        subtotal: subtotal,
        shippingCost: 0, // No shipping cost for pickup
        total: subtotal, // Total is just the subtotal for pickup
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(orderRef, orderData);
      
      // Get the user's email
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        throw new Error('User email not found');
      }
      
      // Create a safe metadata object with no undefined values
      const itemsDescription = items.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
      
      // Initialize Paystack payment
      const paymentData = {
        amount: Math.round(subtotal * 100), // Use subtotal as the total amount
        email: userEmail,
        userId: userId,
        orderId: orderRef.id,
        metadata: {
          orderId: orderRef.id,
          customerName: checkoutData.shippingInfo.fullName,
          items: itemsDescription.length > 0 ? itemsDescription : 'No items'
        }
      };
      
      const paymentResponse = await paystackService.initiatePayment(paymentData);
      
      // Redirect to Paystack checkout page
      if (paymentResponse && paymentResponse.authorizationUrl) {
        setIsCompleted(true);
        localStorage.setItem('greenify_order_pending', 'true');
        window.location.href = paymentResponse.authorizationUrl;
      } else {
        throw new Error('Failed to initialize payment');
      }
      
    } catch (error) {
      console.error('Order processing error:', error);
      toast({
        title: "Error processing order",
        description: error instanceof Error ? error.message : "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    activeStep,
    setActiveStep,
    isCompleted,
    isProcessing,
    checkoutData,
    handleUpdateCheckoutData,
    selectedDeliveryOption,
    handlePlaceOrder,
    isFormComplete
  };
};
