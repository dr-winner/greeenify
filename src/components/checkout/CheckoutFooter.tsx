import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CheckoutFooterProps {
  activeStep: 'shipping' | 'payment';
  onBack: () => void;
  onNext: () => void;
  onPlaceOrder: () => void;
}

const CheckoutFooter = ({
  activeStep,
  onBack,
  onNext,
  onPlaceOrder
}: CheckoutFooterProps) => {
  return (
    <div className="flex justify-between">
      {activeStep !== 'shipping' && (
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      )}
      
      {activeStep === 'shipping' ? (
        <Button className="ml-auto bg-green-600 hover:bg-green-700" onClick={onNext}>
          Continue to Payment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CheckoutFooter;
