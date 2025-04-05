
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';
import { useCart } from '@/hooks/useCart';

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // Redirect to the cart page if the cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Checkout</h1>
        
        <CheckoutFlow 
          onComplete={() => navigate('/')}
        />
      </div>
    </Layout>
  );
};

export default Checkout;
