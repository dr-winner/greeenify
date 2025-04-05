
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface CheckoutButtonProps {
  className?: string;
}

const CheckoutButton = ({ className }: CheckoutButtonProps) => {
  const navigate = useNavigate();
  const { items } = useCart();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={items.length === 0}
      className={`w-full bg-green-600 hover:bg-green-700 ${className}`}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
