
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://imgs.search.brave.com/7_dD96GQ_JrWgprRcyk41wHOObFwTdlnqyopuvCu3uQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc0/NDI5MjQ4L3Bob3Rv/L2ZyZXNoLXZlZ2V0/YWJsZXMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWZ4bGdP/SUVUN2dLYThNM3J3/a1Y5NzRhVWZCMGdW/cFdpSlF3VW94QTRk/dFE9',
    count: 56
  },
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    count: 43
  },
  {
    id: 'tubers',
    name: 'Tubers & Roots',
    image: 'https://imgs.search.brave.com/1rDz2GEnxBh500s8-bdfYjHRYfZichjwYTaHyqTNKEw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/OC8xMS8wOC80OS9w/b3RhdG9lcy0xNTg1/MDc1XzEyODAuanBn',
    count: 27
  },
  {
    id: 'herbs',
    name: 'Herbs & Spices',
    image: 'https://imgs.search.brave.com/tnvALa06mQSmZ5ArQxbjKoquQYfls0UmYdiOQES5ImA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzk1LzA5Lzgz/LzM2MF9GXzExOTUw/OTgzNjdfUlhDcnpn/Mkl2cDMxVmZBbmlR/WFZoS0ExOTNFb01l/eHIuanBn',
    count: 18
  },
  {
    id: 'organic',
    name: 'Organic',
    image: 'https://images.unsplash.com/photo-1621956838481-f8f616950454?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    count: 64
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    <h3 className="font-heading font-semibold text-lg mb-1">{category.name}</h3>
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
