
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';

const CartActions = () => {
  const { clearCart } = useCart();
  
  return (
    <div className="p-4 bg-gray-50 flex flex-wrap justify-between">
      <Link to="/shop">
        <Button variant="outline" className="mb-2 sm:mb-0">
          Continue Shopping
        </Button>
      </Link>
      <Button 
        variant="outline" 
        className="text-red-600 border-red-200 hover:bg-red-50"
        onClick={() => clearCart()}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartActions;
