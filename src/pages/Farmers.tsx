
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Truck, Phone } from "lucide-react";

const farmersData = [
  {
    id: 'f1',
    name: 'Abena Mensah',
    image: 'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm1lciUyMHdvbWFufGVufDB8fDB8fHww',
    description: 'Specializing in organic produce for over 15 years. Our farm follows sustainable practices in the Eastern Region.',
    location: 'Eastern Region, Ghana',
    rating: 4.9,
    products: 32,
    specialty: 'Organic Vegetables',
    deliveryAvailable: true,
  },
  {
    id: 'f2',
    name: 'Kwame Osei',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVyfGVufDB8fDB8fHww',
    description: 'Family-owned farm specializing in cocoa, plantains and other local produce in the Ashanti Region.',
    location: 'Ashanti Region, Ghana',
    rating: 4.7,
    products: 28,
    specialty: 'Cocoa & Plantains',
    deliveryAvailable: true,
  },
  {
    id: 'f3',
    name: 'Ama Darko',
    image: 'https://images.unsplash.com/photo-1513569143478-b38b2c0ef97f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Artisanal dairy farm producing award-winning cheeses and organic milk products in the Volta Region.',
    location: 'Volta Region, Ghana',
    rating: 4.8,
    products: 15,
    specialty: 'Artisanal Dairy',
    deliveryAvailable: false,
  },
  {
    id: 'f4',
    name: 'Kofi Addo',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Innovative hydroponic farm focusing on sustainable urban agriculture near Accra.',
    location: 'Greater Accra, Ghana',
    rating: 4.6,
    products: 23,
    specialty: 'Hydroponic Greens',
    deliveryAvailable: true,
  },
];

const Farmers = () => {
  const [filter, setFilter] = useState('all');

  const filteredFarmers = filter === 'all' 
    ? farmersData 
    : filter === 'delivery' 
      ? farmersData.filter(farmer => farmer.deliveryAvailable)
      : farmersData;
      
  return (
    <Layout>
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-2 text-center">Our Network of Farmers</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Meet the passionate individuals who grow your food with care and sustainable practices.
          </p>
          
          <div className="flex justify-center gap-4 mb-10">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              All Farmers
            </Button>
            <Button 
              variant={filter === 'delivery' ? 'default' : 'outline'}
              onClick={() => setFilter('delivery')}
              className={filter === 'delivery' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Delivery Available
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFarmers.map(farmer => (
              <Card key={farmer.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <Avatar className="h-12 w-12 border-2 border-green-100">
                      <AvatarImage src={farmer.image} alt={farmer.name} />
                      <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{farmer.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        {farmer.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span>{farmer.rating}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-gray-600">{farmer.products} Products</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{farmer.description}</p>
                  <div className="bg-green-50 text-green-700 text-xs font-medium rounded-full px-3 py-1 inline-block">
                    {farmer.specialty}
                  </div>
                  {farmer.deliveryAvailable && (
                    <div className="flex items-center mt-3 text-xs text-gray-600">
                      <Truck className="h-3 w-3 mr-1 text-green-600" />
                      Farm delivery available
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    View Products
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Farmers;
