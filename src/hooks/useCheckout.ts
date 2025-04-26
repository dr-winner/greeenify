import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';
import { CheckoutData, CompleteCheckoutData, DeliveryOption } from '@/components/checkout/types';
import { deliveryOptions } from '@/components/checkout/data';

export const useCheckout = (onComplete?: () => void) => {
  const [activeStep, setActiveStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingInfo: {
      fullName: 'John Doe',
      phoneNumber: '(233) 123-4567',
      address: '123 Main St',
      city: 'Accra',
      region: 'Greater Accra',
      postalCode: '00233',
    },
    deliveryOption: 'standard',
    paymentMethod: 'credit-card',
  });
  
  const { toast } = useToast();
  const { items, subtotal, total, shippingCost, clearCart } = useCart();
  
  const selectedDeliveryOption = deliveryOptions.find(option => option.id === checkoutData.deliveryOption);
  
  const handleUpdateCheckoutData = (data: Partial<CheckoutData>) => {
    setCheckoutData(prev => ({
      ...prev,
      ...data,
    }));
  };
  
  // Check if all required fields are filled based on payment method
  const isFormComplete = (): boolean => {
    // Basic shipping info validation
    const { shippingInfo, paymentMethod } = checkoutData;
    if (!shippingInfo.fullName || !shippingInfo.phoneNumber || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.region || !shippingInfo.postalCode) {
      return false;
    }
    
    // Payment method validation
    if (paymentMethod === 'credit-card') {
      const { cardDetails } = checkoutData;
      if (!cardDetails?.cardholderName || !cardDetails?.cardNumber || 
          !cardDetails?.expiryDate || !cardDetails?.cvc) {
        return false;
      }
    } else if (paymentMethod === 'mobile-money') {
      const { mobileMoneyDetails } = checkoutData;
      if (!mobileMoneyDetails?.phoneNumber || !mobileMoneyDetails?.provider) {
        return false;
      }
    }
    
    return true;
  };
  
  const prepareCompleteCheckoutData = (): CompleteCheckoutData => {
    // Create a deep copy to avoid modifying the original
    const completeData = JSON.parse(JSON.stringify(checkoutData)) as CompleteCheckoutData;
    
    // Ensure payment details are complete or removed
    if (completeData.paymentMethod === 'credit-card' && completeData.cardDetails) {
      // Keep cardDetails as is, they should be complete
    } else {
      // Remove card details if not using credit card
      delete completeData.cardDetails;
    }
    
    if (completeData.paymentMethod === 'mobile-money' && completeData.mobileMoneyDetails) {
      // Keep mobileMoneyDetails as is, they should be complete
    } else {
      // Remove mobile money details if not using mobile money
      delete completeData.mobileMoneyDetails;
    }
    
    return completeData;
  };
  
  const handlePlaceOrder = () => {
    if (!isFormComplete()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before placing your order.",
        variant: "destructive",
      });
      return;
    }
    
    const completeData = prepareCompleteCheckoutData();
    
    // Here you would typically process the payment and create the order
    // For a real-world integration, we would make an API call to the Django backend
    fetch('https://api.yourbackend.com/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
      },
      body: JSON.stringify({
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        delivery_method: completeData.deliveryOption,
        payment_method: completeData.paymentMethod,
        delivery_date: completeData.deliveryDate,
        delivery_time: completeData.deliveryTime,
        shipping_info: completeData.shippingInfo,
        subtotal: subtotal,
        shipping: selectedDeliveryOption?.price || shippingCost,
        tax: subtotal * 0.08,
        total: (
          subtotal + 
          (selectedDeliveryOption?.price !== undefined ? selectedDeliveryOption.price : shippingCost) + 
          (subtotal * 0.08)
        ),
        payment_details: completeData.paymentMethod === 'credit-card' 
          ? completeData.cardDetails 
          : completeData.paymentMethod === 'mobile-money'
            ? completeData.mobileMoneyDetails
            : null,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setIsCompleted(true);
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      // Clear the cart after successful order
      setTimeout(() => {
        clearCart();
        if (onComplete) {
          onComplete();
        }
      }, 3000);
    })
    .catch(error => {
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
      console.error("Order submission error:", error);
    });
  };

  return {
    activeStep,
    setActiveStep,
    isCompleted,
    checkoutData,
    handleUpdateCheckoutData,
    selectedDeliveryOption,
    handlePlaceOrder,
    isFormComplete
  };
};
