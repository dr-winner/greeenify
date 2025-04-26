import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';

// Sample products data with updated categories and Ghana cedis
const allProducts = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    description: "Juicy, ripe tomatoes freshly harvested from local farms. Perfect for stews, salads, and sauces.",
    price: 15.99,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Green Valley Produce",
    farmerId: "102",
    isOrganic: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "2",
    name: "Fresh Plantains",
    description: "Sweet, ripe plantains perfect for frying, boiling or roasting. A versatile staple in Ghanaian cuisine.",
    price: 12.49,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1603052875302-d376a19aa140?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Orchard Hills",
    farmerId: "109",
    isOrganic: true,
    isFeatured: true,
    stock: 30
  },
  {
    id: "3",
    name: "Local Rice",
    description: "Premium locally grown rice. Clean, stone-free and aromatic with excellent cooking quality.",
    price: 35.99,
    unit: "5kg bag",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "grains-cereals",
    farmerName: "Sunrise Farms",
    farmerId: "103",
    isOrganic: false,
    isFeatured: true,
    stock: 40
  },
  {
    id: "4",
    name: "Fresh Ginger",
    description: "Aromatic fresh ginger, excellent for cooking, teas, and traditional remedies.",
    price: 10.49,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1615485736894-a8f7a3192c4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "spices-condiments",
    farmerName: "Herb Haven",
    farmerId: "104",
    isOrganic: true,
    isFeatured: true,
    stock: 35
  },
  {
    id: "5",
    name: "Fresh Yam",
    description: "Premium quality yams with smooth skin and firm flesh. Perfect for boiling, frying or making fufu.",
    price: 24.99,
    unit: "per tuber",
    image: "https://images.unsplash.com/photo-1598030340644-e7c9538c812c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "root-crops",
    farmerName: "Green Fields Farm",
    farmerId: "107",
    isOrganic: false,
    isFeatured: false,
    stock: 20
  },
  {
    id: "6",
    name: "Red Palm Oil",
    description: "Pure, unrefined red palm oil, traditionally processed. Rich in vitamins and perfect for Ghanaian soups and stews.",
    price: 45.99,
    unit: "1L bottle",
    image: "https://images.unsplash.com/photo-1604859309359-9fa8f98d13d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "oils",
    farmerName: "Forest Grove",
    farmerId: "111",
    isOrganic: true,
    isFeatured: true,
    stock: 15
  },
  {
    id: "7",
    name: "Gari",
    description: "High-quality cassava gari, perfect for soaking or making eba. Finely processed for smooth texture.",
    price: 18.99,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1603566541830-dea3e7a0e999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "processed-foods",
    farmerName: "Hillside Creamery",
    farmerId: "108",
    isOrganic: false,
    isFeatured: true,
    stock: 25
  },
  {
    id: "8",
    name: "Dried Fish (Koobi)",
    description: "Traditional salt-cured fish, a staple ingredient in Ghanaian soups and stews.",
    price: 30.99,
    unit: "per pack",
    image: "https://images.unsplash.com/photo-1584268297879-e4bb353d88cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "animal-protein",
    farmerName: "Coastal Catches",
    farmerId: "112",
    isOrganic: false,
    isFeatured: true,
    stock: 18
  },
  {
    id: "9",
    name: "Groundnuts (Peanuts)",
    description: "Raw, unshelled groundnuts. Can be roasted, boiled or used to make groundnut paste.",
    price: 14.99,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1567892737950-30c3b596d7c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "legumes-pulses",
    farmerName: "Sunny Plains",
    farmerId: "113",
    isOrganic: true,
    isFeatured: false,
    stock: 30
  },
  {
    id: "10",
    name: "Shea Butter",
    description: "100% pure, unrefined shea butter. Traditionally processed for cooking and skincare.",
    price: 28.49,
    unit: "500g container",
    image: "https://images.unsplash.com/photo-1575500221017-ea5e7b7d0e34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "oils",
    farmerName: "Northern Treasures",
    farmerId: "114",
    isOrganic: true,
    isFeatured: false,
    stock: 12
  },
  {
    id: "11",
    name: "Fresh Okra",
    description: "Tender, young okra pods. Perfect for soups, stews and traditional dishes.",
    price: 8.49,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Green Fields Farm",
    farmerId: "107",
    isOrganic: true,
    isFeatured: false,
    stock: 40
  },
  {
    id: "12",
    name: "Tiger Nut Drink",
    description: "Refreshing, naturally sweet tiger nut milk. Handcrafted with traditional methods.",
    price: 18.99,
    unit: "1L bottle",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "processed-foods",
    farmerName: "Sweet Beverages",
    farmerId: "115",
    isOrganic: true,
    isFeatured: false,
    stock: 15
  },
  {
    id: "13",
    name: "Fufu Flour Mix",
    description: "Traditional fufu flour mix, easy to prepare. Just add water and stir.",
    price: 22.99,
    unit: "500g pack",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "processed-foods",
    farmerName: "Traditional Foods",
    farmerId: "116",
    isOrganic: false,
    isFeatured: true,
    stock: 25
  },
  {
    id: "14",
    name: "Shito (Hot Pepper Sauce)",
    description: "Authentic Ghanaian hot pepper sauce made with fresh chilies, dried fish, and spices.",
    price: 15.99,
    unit: "200g jar",
    image: "https://images.unsplash.com/photo-1589566661633-5f458f2d4faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "processed-foods",
    farmerName: "Spice Haven",
    farmerId: "117",
    isOrganic: false,
    isFeatured: true,
    stock: 30
  }
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Find the product by ID
  const product = allProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  // Map category to display name
  const getCategoryDisplayName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      'vegetables': 'Vegetables',
      'fruits': 'Fruits',
      'grains-cereals': 'Grains & Cereals',
      'legumes-pulses': 'Legumes & Pulses',
      'nuts-seeds': 'Nuts & Seeds',
      'spices-condiments': 'Spices & Condiments',
      'root-crops': 'Root Crops & Tubers',
      'oils': 'Oils',
      'processed-foods': 'Processed Foods',
      'animal-protein': 'Animal Protein',
      'plant-protein': 'Plant Protein',
    };
    
    return categoryMap[categoryId] || categoryId;
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x600?text=Image+Not+Available';
              }}
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                {getCategoryDisplayName(product.category)}
              </Badge>
              {product.isOrganic && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Organic
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-harvest-100 text-harvest-800 hover:bg-harvest-200">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-heading font-semibold mb-2">{product.name}</h1>
            
            <div className="mb-4">
              <p className="text-xl font-semibold mb-1">₵{product.price.toFixed(2)} <span className="text-sm font-normal text-gray-600">{product.unit}</span></p>
              <p className="text-sm text-gray-600">From: {product.farmerName}</p>
            </div>
            
            <div className="border-t border-b py-6 my-6">
              <h2 className="font-medium text-lg mb-3">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">
                <span className="font-medium">Availability: </span>
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
