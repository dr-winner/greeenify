
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Wheat, Bean, Egg } from 'lucide-react';

const categories = [
  {
    id: 'fresh-produce',
    name: 'Fresh Produce',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1557844352-761f2ddf6d97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Fresh vegetables, fruits and greens',
    count: 56
  },
  {
    id: 'grains-cereals',
    name: 'Grains & Cereals',
    icon: Wheat,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Local and imported grains',
    count: 32
  },
  {
    id: 'legumes-pulses',
    name: 'Legumes & Pulses',
    icon: Bean,
    image: 'https://images.unsplash.com/photo-1515543904379-3d757abe3d10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Beans, cowpeas and groundnuts',
    count: 27
  },
  {
    id: 'root-crops',
    name: 'Root Crops & Tubers',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 13V4M17 8l-5 5-5-5M4 22h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-7v6.4a2 2 0 1 1-2 0V10H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1598030340644-e7c9538c812c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Cassava, yam, cocoyam and more',
    count: 20
  },
  {
    id: 'processed-foods',
    name: 'Processed Foods',
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1621956838481-f8f616950454?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Gari, fufu flour and more',
    count: 38
  },
  {
    id: 'animal-protein',
    name: 'Animal Protein',
    icon: Egg,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Dried fish, smoked fish and more',
    count: 17
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Shop by Category</h2>
          <Link to="/shop" className="text-green-600 hover:text-green-700 font-medium transition-colors">
            View All Categories
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop/${category.id}`}>
              <Card className="card-hover h-full overflow-hidden">
                <div className="relative pt-[100%]">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/400x400?text=Category+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      {typeof category.icon === 'function' && (
                        <category.icon className="h-5 w-5 text-white" />
                      )}
                      <h3 className="font-heading font-semibold text-lg">{category.name}</h3>
                    </div>
                    <p className="text-xs text-gray-100 mb-1">{category.description}</p>
                    <p className="text-sm text-gray-100">{category.count} products</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
