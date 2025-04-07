
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface CartButtonProps {
  isMobile?: boolean;
}

const CartButton = ({ isMobile = false }: CartButtonProps) => {
  const { items } = useCart();
  const { requireAuth } = useAuthContext();
  const navigate = useNavigate();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleClick = () => {
    if (requireAuth()) {
      navigate('/cart');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      aria-label="Cart"
      onClick={handleClick}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
