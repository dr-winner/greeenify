import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/useCart';
import CartEmpty from '@/components/cart/CartEmpty';
import CartItems from '@/components/cart/CartItems';
import CartActions from '@/components/cart/CartActions';
import CartSummary from '@/components/cart/CartSummary';
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { items, isLoading } = useCart();
  const { isAuthenticated } = useAuthContext();
  const { toast } = useToast();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please log in to view your cart.",
      variant: "destructive"
    });
    return <Navigate to="/login" />;
  }
  
  if (isLoading) {
    return (
      <Layout>
        <div className="py-10 container-custom flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
          <p className="text-lg text-gray-600">Loading your cart...</p>
        </div>
      </Layout>
    );
  }
  
  if (items.length === 0) {
    return (
      <Layout>
        <CartEmpty />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-10 container-custom">
        <h1 className="text-3xl font-heading font-semibold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <CartItems />
          
          {/* Cart Summary */}
          <CartSummary />
        </div>
        
        {/* Cart Actions - Only shown in full cart view */}
        <div className="mt-6">
          <CartActions />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
