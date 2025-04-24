import React from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Heart, Loader2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import Layout from '@/components/layout/Layout';
import { useAuthContext } from '@/hooks/useAuthContext';

const PageHeader = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div className="bg-green-50 py-8 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { items, removeItem, clearWishlist, isLoading } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const { isAuthenticated } = useAuthContext();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please log in to view your wishlist.",
      variant: "destructive"
    });
    return <Navigate to="/login" />;
  }

  const handleAddToCart = async (product: any) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = async (productId: string, productName: string) => {
    try {
      await removeItem(productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClearWishlist = async () => {
    try {
      await clearWishlist();
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist.",
      });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to clear wishlist. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <PageHeader
        title="My Wishlist"
        description="Items you've saved for later"
      />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mr-2" />
            <p className="text-lg text-gray-600">Loading your wishlist...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist and revisit them anytime.</p>
            <Link to="/shop">
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{items.length} {items.length === 1 ? 'Item' : 'Items'}</h2>
              <Button 
                variant="outline" 
                onClick={handleClearWishlist}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(product => (
                <div 
                  key={product.id} 
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/400x300?text=No+Image';
                        }}
                      />
                    </Link>
                    <button 
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
