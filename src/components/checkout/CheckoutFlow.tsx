import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import OrderProgress from './OrderProgress';
import OrderSummary from './OrderSummary';
import OrderSuccess from './OrderSuccess';
import CheckoutHeader from './CheckoutHeader';
import CheckoutContent from './CheckoutContent';
import CheckoutFooter from './CheckoutFooter';
import { useCheckout } from '@/hooks/useCheckout';

interface CheckoutFlowProps {
  onComplete?: () => void;
}

const CheckoutFlow = ({ onComplete }: CheckoutFlowProps) => {
  const {
    activeStep,
    setActiveStep,
    isCompleted,
    checkoutData,
    handleUpdateCheckoutData,
    selectedDeliveryOption,
    handlePlaceOrder
  } = useCheckout(onComplete);
  
  if (isCompleted) {
    return <OrderSuccess onClick={onComplete} />;
  }
  
  const handleBack = () => {
    setActiveStep('shipping');
  };

  const handleNext = () => {
    setActiveStep('payment');
  };
  
  return (
    <div className="py-6">
      <div className="mb-8">
        <OrderProgress activeStep={activeStep} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CheckoutHeader activeStep={activeStep} />
            </CardHeader>
            <CardContent>
              <CheckoutContent
                activeStep={activeStep}
                checkoutData={checkoutData}
                onUpdateCheckoutData={handleUpdateCheckoutData}
                onContinue={() => setActiveStep('payment')}
              />
            </CardContent>
            <CardFooter>
              <CheckoutFooter
                activeStep={activeStep}
                onBack={handleBack}
                onNext={handleNext}
                onPlaceOrder={handlePlaceOrder}
              />
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <OrderSummary selectedDeliveryOption={selectedDeliveryOption} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
