
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';

const CartEmpty = () => {
  return (
    <div className="py-16 container-custom">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-6 flex justify-center">
          <ShoppingBag className="h-20 w-20 text-gray-300" />
        </div>
        <h1 className="text-2xl font-heading font-semibold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/shop">
          <Button className="bg-green-600 hover:bg-green-700">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
