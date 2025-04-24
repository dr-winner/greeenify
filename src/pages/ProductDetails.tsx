import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';

// Sample products data
const allProducts = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet and juicy organic strawberries, freshly picked from our fields. Our strawberries are grown without synthetic pesticides or fertilizers, ensuring you get the purest, most natural flavor in every bite. They're perfect for snacking, adding to desserts, or blending into smoothies.",
    price: 0.50,
    unit: "per basket",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Smith Family Farm",
    farmerId: "101",
    isOrganic: true,
    isFeatured: true,
    stock: 20
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    description: "Colorful mix of heirloom tomatoes varieties, perfect for salads. These tomatoes come in various sizes, colors, and flavors, offering a much more complex and rich taste than conventional varieties. Each tomato is carefully selected at peak ripeness to ensure maximum flavor.",
    price: 3.49,
    unit: "per lb",
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Green Valley Produce",
    farmerId: "102",
    isOrganic: true,
    isFeatured: true,
    stock: 15
  },
  {
    id: "3",
    name: "Fresh Eggs",
    description: "Free-range chicken eggs from pasture-raised hens. These eggs come from chickens that roam freely outside, enjoying a natural diet of grasses, seeds, and insects resulting in eggs with richer yolks and better flavor than conventional eggs.",
    price: 5.99,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "dairy",
    farmerName: "Sunrise Farms",
    farmerId: "103",
    isOrganic: false,
    isFeatured: true,
    stock: 30
  },
  {
    id: "4",
    name: "Fresh Basil",
    description: "Aromatic fresh basil, perfect for Italian dishes and homemade pesto. Our basil is grown using sustainable farming practices, ensuring you get the most flavorful and aromatic herbs for your cooking needs.",
    price: 2.49,
    unit: "per bunch",
    image: "https://rocketfarms.com/wp-content/uploads/470A2754b-scaled.webp",
    category: "herbs",
    farmerName: "Herb Haven",
    farmerId: "104",
    isOrganic: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "5",
    name: "Grass-Fed Ground Beef",
    description: "Premium grass-fed beef from free-range cattle. Our beef comes from cattle that are raised on open pastures, eating a natural diet of grasses which results in leaner, more flavorful meat that's also higher in beneficial omega-3 fatty acids.",
    price: 7.99,
    unit: "per lb",
    image: "https://choplocal.com/images/detailed/7/Ground_Beef__2_.jpg",
    category: "meat",
    farmerName: "Meadow Creek Ranch",
    farmerId: "105",
    isOrganic: true,
    isFeatured: false,
    stock: 10
  },
  {
    id: "6",
    name: "Honey",
    description: "Raw, unfiltered honey from local wildflowers. This honey is harvested from hives located in pristine meadows, where bees gather nectar from a variety of wildflowers. It's never heated above natural hive temperatures or filtered, preserving all the beneficial enzymes, pollen, and antioxidants.",
    price: 8.99,
    unit: "16 oz jar",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "organic",
    farmerName: "Sweet Meadows Apiary",
    farmerId: "106",
    isOrganic: true,
    isFeatured: true,
    stock: 18
  },
  {
    id: "7",
    name: "Fresh Spinach",
    description: "Tender, dark green spinach leaves packed with nutrients. Our spinach is harvested at its peak freshness to ensure maximum flavor and nutritional value. Perfect for salads, smoothies, or cooking.",
    price: 3.29,
    unit: "per bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Green Fields Farm",
    farmerId: "107",
    isOrganic: true,
    isFeatured: false,
    stock: 22
  },
  {
    id: "8",
    name: "Artisan Cheese",
    description: "Hand-crafted artisan cheese made from organic milk. Our artisan cheesemakers use traditional methods passed down through generations to create unique, flavorful cheeses that you won't find in ordinary supermarkets.",
    price: 6.99,
    unit: "8 oz",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "dairy",
    farmerName: "Hillside Creamery",
    farmerId: "108",
    isOrganic: false,
    isFeatured: true,
    stock: 12
  },
  {
    id: "9",
    name: "Organic Apples",
    description: "Crisp, sweet organic apples, perfect for snacking or baking. Our apples are grown using organic farming practices, ensuring they're free from synthetic pesticides and fertilizers. They're picked at peak ripeness for the best flavor and crunch.",
    price: 3.99,
    unit: "per lb",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Orchard Hills",
    farmerId: "109",
    isOrganic: true,
    isFeatured: false,
    stock: 40
  },
  {
    id: "10",
    name: "Fresh Bread",
    description: "Artisan sourdough bread, freshly baked with organic flour. Made with a slow fermentation process and the finest organic flour, our sourdough bread has a complex flavor, chewy interior, and crispy crust that can only be achieved through traditional baking methods.",
    price: 5.49,
    unit: "loaf",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "bakery",
    farmerName: "Countryside Bakery",
    farmerId: "110",
    isOrganic: true,
    isFeatured: false,
    stock: 15
  },
  {
    id: "11",
    name: "Fresh Carrots",
    description: "Sweet, crunchy carrots harvested at peak freshness. Our carrots are grown in fertile soil rich in organic matter, giving them exceptional sweetness and that perfect crunch. They're hand-harvested to ensure quality and perfect ripeness.",
    price: 2.49,
    unit: "per bunch",
    image: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Green Fields Farm",
    farmerId: "107",
    isOrganic: false,
    isFeatured: false,
    stock: 30
  },
  {
    id: "12",
    name: "Local Maple Syrup",
    description: "Pure maple syrup, harvested and bottled by local producers. Our maple syrup is made using traditional methods, where sap from maple trees is collected and carefully boiled down to create a rich, amber syrup with complex flavors that mass-produced syrups simply can't match.",
    price: 12.99,
    unit: "8 oz bottle",
    image: "https://images.squarespace-cdn.com/content/v1/5e77f666d1740b5126214300/1673469727207-Q12NT1YUUA0IHN8Z9WSE/IMG_0134-low.jpg",
    category: "organic",
    farmerName: "Forest Grove",
    farmerId: "111",
    isOrganic: true,
    isFeatured: false,
    stock: 8
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
                {product.category}
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
