
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/components/ui/use-toast";
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page when clicking the button
    
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <Card className="card-hover overflow-hidden flex flex-col h-full">
        <div className="relative pt-[75%] overflow-hidden">
          <img 
            src={imageError ? 'https://placehold.co/600x400?text=Product+Image' : product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={handleImageError}
          />
          {product.isOrganic && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">
              Organic
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-harvest-500 text-white">
              Featured
            </Badge>
          )}
          <button 
            className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-white/80 rounded-full"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        
        <CardContent className="pt-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.farmerName}</p>
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-900">₵{product.price.toFixed(2)}</span>
              <span className="block text-xs text-gray-600">{product.unit}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
