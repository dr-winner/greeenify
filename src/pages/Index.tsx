import Layout from '@/components/layout/Layout';
import FeaturedCategories from '@/components/products/FeaturedCategories';
import ProductGrid from '@/components/products/ProductGrid';
import TestimonialSection from '@/components/testimonials/TestimonialSection';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

// Sample products data
const featuredProducts = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet and juicy organic strawberries, freshly picked from our fields.",
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
    description: "Colorful mix of heirloom tomatoes varieties, perfect for salads.",
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
    description: "Free-range chicken eggs from pasture-raised hens.",
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
    description: "Aromatic fresh basil, perfect for Italian dishes and homemade pesto.",
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
    description: "Premium grass-fed beef from free-range cattle.",
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
    description: "Raw, unfiltered honey from local wildflowers.",
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
    description: "Tender, dark green spinach leaves packed with nutrients.",
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
    description: "Hand-crafted artisan cheese made from organic milk.",
    price: 6.99,
    unit: "8 oz",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "dairy",
    farmerName: "Hillside Creamery",
    farmerId: "108",
    isOrganic: false,
    isFeatured: true,
    stock: 12
  }
];

const Index = () => {
  const { toast } = useToast();
  
  const showWelcomeToast = () => {
    toast({
      title: "Welcome to Farm Fresh Market",
      description: "Your marketplace for fresh, local produce.",
    });
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-green-800 mb-4">
                Fresh From Farm to Your Table
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                Support local farmers and enjoy freshly harvested produce delivered directly to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                  onClick={showWelcomeToast}
                  asChild
                >
                  <Link to="/shop">Shop Now</Link>
                </Button>
                {/* <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/farmers">Meet Our Farmers</Link>
                </Button> */}
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-green-100 rounded-full -translate-x-8 translate-y-8"></div>
              <img 
                src="https://gopebbles.com/wp-content/uploads/2025/01/qtq80-C5NrEx-1024x679.jpeg" 
                alt="Farming scene"
                className="relative rounded-3xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold mb-4">Why Choose Farm Fresh Market?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our farm-to-table marketplace connects you directly with local farmers, ensuring you get the freshest, most nutritious food while supporting sustainable agriculture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h10"></path>
                  <path d="M2 14h7"></path>
                  <path d="M2 10h7"></path>
                  <path d="M2 6h16"></path>
                  <path d="M18 10h-4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Farm Fresh Quality</h3>
              <p className="text-gray-600">
                Get produce picked at peak ripeness, full of flavor and nutrition not found in most stores.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Support Local Farmers</h3>
              <p className="text-gray-600">
                Your purchase directly supports local farmers and sustainable agricultural practices.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M5 17h-2v-4m0 -4h2"></path>
                  <path d="M9 17l6 0"></path>
                  <path d="M19 17h2v-4m0 -4h-2"></path>
                  <path d="M5 9l14 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                From farm to your doorstep within 24-48 hours, ensuring maximum freshness and taste.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <FeaturedCategories />
      
      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <ProductGrid products={featuredProducts} title="Featured Products" />
        </div>
      </section>
      
      {/* Testimonials - replaced with our new component */}
      <TestimonialSection />
      
      {/* CTA Section */}
      <section className="bg-harvest-500 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to taste the difference?</h2>
            <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers enjoying farm-fresh produce delivered to your doorstep.
            </p>
            <Button className="bg-white text-harvest-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium" asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
