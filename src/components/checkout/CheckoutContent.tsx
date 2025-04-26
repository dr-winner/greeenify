
import ShippingStep from './steps/ShippingStep';
import PaymentStep from './steps/PaymentStep';
import ReviewStep from './steps/ReviewStep';
import { CheckoutData } from "./types";

interface CheckoutContentProps {
  activeStep: 'shipping' | 'payment' | 'review';
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
  onContinue: () => void;
}

const CheckoutContent = ({
  activeStep,
  checkoutData,
  onUpdateCheckoutData,
  onContinue
}: CheckoutContentProps) => {
  return (
    <>
      {activeStep === 'shipping' && (
        <ShippingStep 
          checkoutData={checkoutData}
          onUpdateCheckoutData={onUpdateCheckoutData}
          onContinue={onContinue}
        />
      )}
      
      {activeStep === 'payment' && (
        <PaymentStep 
          checkoutData={checkoutData}
          onUpdateCheckoutData={onUpdateCheckoutData}
        />
      )}
      
      {activeStep === 'review' && (
        <ReviewStep checkoutData={checkoutData} />
      )}
    </>
  );
};

export default CheckoutContent;
