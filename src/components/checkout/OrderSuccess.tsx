
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSuccessProps {
  onClick?: () => void;
}

const OrderSuccess = ({ onClick }: OrderSuccessProps) => {
  const navigate = useNavigate();
  
  const handleContinueShopping = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/shop');
    }
  };
  
  return (
    <div className="py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
      <p className="text-gray-600 mb-8">
        Your order confirmation has been sent to your email address.
        <br />We'll notify you when your order ships.
      </p>
      <Button onClick={handleContinueShopping} className="bg-green-600 hover:bg-green-700">
        Continue Shopping
      </Button>
    </div>
  );
};

export default OrderSuccess;
