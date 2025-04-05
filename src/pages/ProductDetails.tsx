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
    price: 25.00,
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
    price: 15.00,
    unit: "per kg",
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
    image: "https://images.unsplash.com/photo-1600599067176-8ab6e56e5008?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1551446220-5a02a7c56710?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
    price: 45.00,
    unit: "500g jar",
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
    price: 12.00,
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
    price: 55.00,
    unit: "250g",
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
    price: 20.00,
    unit: "per kg",
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
    price: 30.00,
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
    price: 12.00,
    unit: "per kg",
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
    image: "https://imgs.search.brave.com/ZTRXWENNATuDYabbRfbWBX23niC3jXfQw1Q7n1dmKgI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vbWFyc2hh/c21hcGxlaG91c2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzAyLzYuNS1v/ei1wZWNhbnMuanBn/P2ZpdD03NTAsNzUw/JnNzbD0x",
    category: "organic",
    farmerName: "Forest Grove",
    farmerId: "111",
    isOrganic: true,
    isFeatured: false,
    stock: 8
  },
  {
    id: "13",
    name: "Fresh Plantains",
    description: "Ripe plantains perfect for frying or making local dishes. Our plantains are harvested at the perfect ripeness to ensure the best flavor and texture for your traditional dishes.",
    price: 15.00,
    unit: "per kg",
    image: "https://imgs.search.brave.com/ZCceds7JnB0Ww1T7grXptFGddfTi1l7U0i2tkoxD4EA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9iYW5hbmEtd29v/ZGVuLXRhYmxlLWJh/Y2tncm91bmRfNDQw/NzMtMzMyLmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
    category: "vegetables",
    farmerName: "Green Fields Farm",
    farmerId: "107",
    isOrganic: true,
    isFeatured: true,
    stock: 35
  },
  {
    id: "14",
    name: "Fresh Cassava",
    description: "Fresh cassava roots, perfect for traditional dishes. Our cassava is grown using sustainable farming practices and harvested at peak freshness.",
    price: 12.00,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "vegetables",
    farmerName: "Roots & Tubers Farm",
    farmerId: "112",
    isOrganic: true,
    isFeatured: false,
    stock: 40
  },
  {
    id: "15",
    name: "Fresh Palm Oil",
    description: "Locally produced red palm oil, rich in nutrients. Our palm oil is extracted using traditional methods that preserve its natural color and nutritional value.",
    price: 35.00,
    unit: "per liter",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "organic",
    farmerName: "Palm Grove Farm",
    farmerId: "113",
    isOrganic: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "16",
    name: "Fresh Cocoa Beans",
    description: "Premium quality cocoa beans from local farmers. Our cocoa beans are carefully fermented and dried to develop their rich chocolate flavor.",
    price: 75.00,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "organic",
    farmerName: "Cocoa Valley Farm",
    farmerId: "114",
    isOrganic: true,
    isFeatured: true,
    stock: 15
  },
  {
    id: "17",
    name: "Fresh Pineapple",
    description: "Sweet and juicy local pineapples. Our pineapples are grown in rich volcanic soil and harvested at peak sweetness for the best flavor.",
    price: 25.00,
    unit: "per piece",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Tropical Fruits Farm",
    farmerId: "115",
    isOrganic: true,
    isFeatured: true,
    stock: 30
  },
  {
    id: "18",
    name: "Fresh Mangoes",
    description: "Sweet and ripe local mangoes. Our mangoes are hand-picked at the perfect ripeness to ensure maximum sweetness and flavor.",
    price: 20.00,
    unit: "per kg",
    image: "https://imgs.search.brave.com/6w70Zdr6Qq4rKpySlESKDXkBLNC5DIHG-wNdZcURgVY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzMwLzczLzcy/LzM2MF9GXzgzMDcz/NzIyNl9EZllkQ2N0/UWJNUWxWOG8zZUlN/eTR5ZldXZnkzSEhL/ZS5qcGc",
    category: "fruits",
    farmerName: "Mango Grove Farm",
    farmerId: "116",
    isOrganic: true,
    isFeatured: true,
    stock: 45
  },
  {
    id: "19",
    name: "Fresh Peanuts",
    description: "Locally grown and roasted peanuts. Our peanuts are carefully roasted to bring out their natural flavor and crunch.",
    price: 25.00,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "organic",
    farmerName: "Nut Farm",
    farmerId: "117",
    isOrganic: true,
    isFeatured: false,
    stock: 20
  },
  {
    id: "20",
    name: "Fresh Ginger",
    description: "Fresh and aromatic local ginger root. Our ginger is grown in rich soil and harvested at the perfect time for maximum flavor and health benefits.",
    price: 30.00,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "herbs",
    farmerName: "Spice Farm",
    farmerId: "118",
    isOrganic: true,
    isFeatured: true,
    stock: 25
  },
  {
    id: "21",
    name: "Fresh Turmeric",
    description: "Fresh turmeric root with intense flavor. Our turmeric is grown organically and harvested at peak potency for maximum health benefits.",
    price: 35.00,
    unit: "per kg",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "herbs",
    farmerName: "Spice Farm",
    farmerId: "118",
    isOrganic: true,
    isFeatured: false,
    stock: 15
  },
  {
    id: "22",
    name: "Fresh Coconut",
    description: "Fresh young coconuts with sweet water. Our coconuts are harvested at the perfect stage for drinking, ensuring sweet and refreshing coconut water.",
    price: 15.00,
    unit: "per piece",
    image: "https://imgs.search.brave.com/3Sf9TxDQpWKmt6ZV5vmCq2GjWh6pvuGmFL2_ANGQ8X0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTk0/OTExMDk0L3Bob3Rv/L2dyZWVuLWNvY29u/dXRzLWhhbmdpbmct/b24tdHJlZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9S2hq/NEZDTUhWT0tseEI2/MDhjNm43MHFkWmJQ/Q0cwU3FSV3cwU0Nw/T1FIND0",
    category: "fruits",
    farmerName: "Coconut Grove Farm",
    farmerId: "119",
    isOrganic: true,
    isFeatured: true,
    stock: 40
  },
  {
    id: "23",
    name: "Fresh Papaya",
    description: "Sweet and ripe local papayas. Our papayas are grown in tropical conditions and harvested at peak ripeness for the best flavor and nutrition.",
    price: 25.00,
    unit: "per piece",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Tropical Fruits Farm",
    farmerId: "115",
    isOrganic: true,
    isFeatured: false,
    stock: 20
  },
  {
    id: "24",
    name: "Fresh Watermelon",
    description: "Sweet and juicy local watermelons. Our watermelons are grown in rich soil and harvested at peak sweetness for the most refreshing taste.",
    price: 35.00,
    unit: "per piece",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "fruits",
    farmerName: "Tropical Fruits Farm",
    farmerId: "115",
    isOrganic: true,
    isFeatured: true,
    stock: 15
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
              <p className="text-xl font-semibold mb-1">${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-600">{product.unit}</span></p>
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
