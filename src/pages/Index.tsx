
import Layout from '@/components/layout/Layout';
import FeaturedCategories from '@/components/products/FeaturedCategories';
import ProductGrid from '@/components/products/ProductGrid';
import TestimonialSection from '@/components/testimonials/TestimonialSection';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';

// Sample products data with updated categories and Ghana cedis
const featuredProducts = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    description: "Juicy, ripe tomatoes freshly harvested from local farms.",
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
    description: "Sweet, ripe plantains perfect for frying or roasting.",
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
    description: "Premium locally grown rice, clean and stone-free.",
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
    id: "13",
    name: "Fufu Flour Mix",
    description: "Traditional fufu flour mix, easy to prepare.",
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
    id: "5",
    name: "Fresh Yam",
    description: "Premium quality yams with smooth skin and firm flesh.",
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
    description: "Pure, unrefined red palm oil, traditionally processed.",
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
    description: "High-quality cassava gari, perfect for soaking.",
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
    id: "14",
    name: "Shito (Hot Pepper Sauce)",
    description: "Authentic Ghanaian hot pepper sauce with fresh chilies.",
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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedCategories />
      <section className="py-12 bg-white">
        <div className="container-custom">
          <ProductGrid products={featuredProducts} title="Featured Products" />
        </div>
      </section>
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
