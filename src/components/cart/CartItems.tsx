
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';

const CartItems = () => {
  const { items } = useCart();

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-700">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        
        {/* Cart Items */}
        <div className="divide-y">
          {items.map((item) => (
            <CartItem 
              key={item.product.id} 
              product={item.product} 
              quantity={item.quantity} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
