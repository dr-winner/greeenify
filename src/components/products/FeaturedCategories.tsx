
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://media.licdn.com/dms/image/v2/D4D12AQG8xwTte9Bp5w/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1712375344673?e=1748476800&v=beta&t=G9rF7LPTY3bjDEhriigztc0Nc91XuP56MOn3A7bp3fE',
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
    image: 'https://media.istockphoto.com/id/530514284/photo/potatoes-in-the-farm.jpg?s=612x612&w=0&k=20&c=YE5hCCpeyOYytHuV_H8BBjbb0doK21Ukv0Dl_48862Y=',
    count: 27
  },
  {
    id: 'herbs',
    name: 'Herbs & Spices',
    image: 'https://foodal.com/wp-content/uploads/2018/11/Your-Ultimate-Guide-to-Kitchen-Herbs-Spices-FB.jpg',
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
