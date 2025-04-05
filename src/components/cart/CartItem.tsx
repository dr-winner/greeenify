
import { X, Minus, Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  return (
    <div className="p-4">
      <div className="md:grid md:grid-cols-12 md:gap-4 flex flex-col">
        {/* Product */}
        <div className="col-span-6 flex">
          <Link to={`/product/${product.id}`} className="w-20 h-20 rounded bg-gray-100 overflow-hidden mr-4 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/80x80?text=Image+Not+Available';
              }}
            />
          </Link>
          <div>
            <Link to={`/product/${product.id}`} className="hover:text-green-600 transition-colors">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-600">{product.farmerName}</p>
            {product.isOrganic && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Organic
              </span>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="col-span-2 flex md:justify-center md:items-center mt-4 md:mt-0">
          <span className="md:hidden text-sm text-gray-600 mr-2">Price:</span>
          <span>₵{product.price.toFixed(2)}</span>
        </div>
        
        {/* Quantity */}
        <div className="col-span-2 flex md:justify-center md:items-center mt-4 md:mt-0">
          <span className="md:hidden text-sm text-gray-600 mr-2">Quantity:</span>
          <div className="flex items-center border rounded">
            <button 
              onClick={() => handleQuantityChange(product.id, quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(product.id, quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {/* Total */}
        <div className="col-span-2 flex justify-between md:justify-end items-center mt-4 md:mt-0">
          <span className="md:hidden text-sm text-gray-600 mr-2">Total:</span>
          <div className="flex items-center">
            <span className="font-medium mr-4">
              ₵{(product.price * quantity).toFixed(2)}
            </span>
            <button 
              onClick={() => handleRemoveItem(product.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
