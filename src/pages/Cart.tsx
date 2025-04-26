
import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/useCart';
import CartEmpty from '@/components/cart/CartEmpty';
import CartItems from '@/components/cart/CartItems';
import CartActions from '@/components/cart/CartActions';
import CartSummary from '@/components/cart/CartSummary';

const Cart = () => {
  const { items } = useCart();
  
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
