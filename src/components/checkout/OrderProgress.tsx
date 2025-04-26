
import { CheckCircle, CreditCard, Home } from "lucide-react";

interface OrderProgressProps {
  activeStep: 'shipping' | 'payment' | 'review';
}

const OrderProgress = ({ activeStep }: OrderProgressProps) => {
  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          activeStep === 'shipping' || activeStep === 'payment' || activeStep === 'review' 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          <Home className="h-5 w-5" />
        </div>
        <span className="text-sm mt-2">Shipping</span>
      </div>
      
      <div className="flex-1 h-1 mx-2 bg-gray-200">
        <div className={`h-full ${
          activeStep === 'payment' || activeStep === 'review' ? 'bg-green-600' : 'bg-gray-200'
        }`} />
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          activeStep === 'payment' || activeStep === 'review' 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          <CreditCard className="h-5 w-5" />
        </div>
        <span className="text-sm mt-2">Payment</span>
      </div>
      
      <div className="flex-1 h-1 mx-2 bg-gray-200">
        <div className={`h-full ${
          activeStep === 'review' ? 'bg-green-600' : 'bg-gray-200'
        }`} />
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          activeStep === 'review' 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          <CheckCircle className="h-5 w-5" />
        </div>
        <span className="text-sm mt-2">Review</span>
      </div>
    </div>
  );
};

export default OrderProgress;
