
import Layout from '@/components/layout/Layout';
import FeaturedCategories from '@/components/products/FeaturedCategories';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

// Sample products data
const featuredProducts = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet and juicy organic strawberries, freshly picked from our fields.",
    price: 4.99,
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
    image: "https://imgs.search.brave.com/9IKxcc3XrH-kO6qUEFMd4V0kb0tCxj43LS4dYR8Vnvs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/MzUyMDQwMy9waG90/by9iYXNpbC1jbG9z/ZS11cC1waG90by5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/dlpTdWY0emxOOGpx/RkN0ampmVi1hMVpu/cW1pY3Z6VXNhY2ZZ/VE1KR19nQT0",
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
    image: "https://imgs.search.brave.com/WJYcE80qWPk--kbIePG6zJkKQL69Lxrh6lDAbI6q6l0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93aGl0/ZW9ha3Bhc3R1cmVz/LmNvbS9jZG4vc2hv/cC9jb2xsZWN0aW9u/cy8yMDA1MTEtNG96/LWJ1cmdlci1ncm91/bmQtYmVlZi1wYXR0/aWVzLXNwcmluZy1z/dW1tZXItZmFsbC11/bmNvb2tlZC1iZWVm/LTYwMHg2MDBfMzE4/ZTRhOTYtYjBhNy00/YzVmLWFjNjctZmY3/NmQxYWVlZjVlLmpw/Zz92PTE2MTY3OTI2/MjYmd2lkdGg9MTA4/MA",
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
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/farmers">Meet Our Farmers</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-green-100 rounded-full -translate-x-8 translate-y-8"></div>
              <img 
                src="https://imgs.search.brave.com/gu5RjaYH8enhf26y7vzzozc-JaTJybdqPtdwNr05oAc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFybWFmcmljYS5v/cmcvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDYvWW91bmct/ZmFybWVycy0xMjgw/eDk2MC5qcGc" 
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
      
      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="container-custom">
          <h2 className="text-3xl font-heading font-semibold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Sarah Addobea</h4>
                  <p className="text-sm text-gray-600">Loyal Customer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I've been using Farm Fresh Market for months now, and the quality is consistently excellent. I love knowing exactly where my food comes from!"
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Michael Addo</h4>
                  <p className="text-sm text-gray-600">Home Chef</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a chef, the quality of ingredients matters. Farm Fresh Market's produce has elevated my cooking to a whole new level. My family can taste the difference!"
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Emmanuela Kusi</h4>
                  <p className="text-sm text-gray-600">Health Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The organic selection is amazing! Delivery is always prompt, and I love the seasonal variety. Farm Fresh Market has made healthy eating so much easier."
              </p>
            </div>
          </div>
        </div>
      </section>
      
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
