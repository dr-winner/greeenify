import ShippingStep from './steps/ShippingStep';
import PaymentStep from './steps/PaymentStep';
import { CheckoutData } from "./types";

interface CheckoutContentProps {
  activeStep: 'shipping' | 'payment';
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
    </>
  );
};

export default CheckoutContent;
