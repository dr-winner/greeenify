
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from 'lucide-react';

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

const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : []
  );
  const [isOrganic, setIsOrganic] = useState<boolean | undefined>(undefined);
  
  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    // Filter by category if categories are selected
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by organic if selected
    if (isOrganic !== undefined && product.isOrganic !== isOrganic) {
      return false;
    }
    
    return true;
  });
  
  const categories = [
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains-cereals', name: 'Grains & Cereals' },
    { id: 'legumes-pulses', name: 'Legumes & Pulses' },
    { id: 'nuts-seeds', name: 'Nuts & Seeds' },
    { id: 'spices-condiments', name: 'Spices & Condiments' },
    { id: 'root-crops', name: 'Root Crops & Tubers' },
    { id: 'oils', name: 'Oils' },
    { id: 'processed-foods', name: 'Processed Foods' },
    { id: 'animal-protein', name: 'Animal Protein' },
    { id: 'plant-protein', name: 'Plant Protein' }
  ];
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const handleOrganicChange = (value: boolean | undefined) => {
    setIsOrganic(value);
  };
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setIsOrganic(undefined);
  };
  
  return (
    <Layout>
      <section className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-heading font-semibold">Shop All Products</h1>
            <Button
              variant="outline"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden"
            >
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className={`w-full md:w-64 md:block ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
              <div className="sticky top-24 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-lg">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-sm text-green-700 hover:text-green-800"
                  >
                    Clear All
                  </Button>
                </div>
                
                <Accordion type="multiple" defaultValue={['categories', 'price', 'options']}>
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category.id)}
                            />
                            <Label
                              htmlFor={`category-${category.id}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={handlePriceRangeChange}
                        />
                        <div className="flex justify-between">
                          <span className="text-sm">₵{priceRange[0].toFixed(2)}</span>
                          <span className="text-sm">₵{priceRange[1].toFixed(2)}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="options">
                    <AccordionTrigger>Options</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox
                            id="organic-yes"
                            checked={isOrganic === true}
                            onCheckedChange={() => handleOrganicChange(isOrganic === true ? undefined : true)}
                          />
                          <Label
                            htmlFor="organic-yes"
                            className="ml-2 text-sm cursor-pointer"
                          >
                            Organic Only
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            id="organic-no"
                            checked={isOrganic === false}
                            onCheckedChange={() => handleOrganicChange(isOrganic === false ? undefined : false)}
                          />
                          <Label
                            htmlFor="organic-no"
                            className="ml-2 text-sm cursor-pointer"
                          >
                            Non-Organic Only
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            {/* Active filters */}
            <div className="flex-1">
              {(selectedCategories.length > 0 || isOrganic !== undefined || priceRange[0] > 0 || priceRange[1] < 100) && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => {
                      const category = categories.find(c => c.id === cat);
                      return (
                        <div 
                          key={cat} 
                          className="flex items-center bg-white border rounded-full px-3 py-1 text-sm"
                        >
                          <span>{category?.name}</span>
                          <button 
                            onClick={() => handleCategoryChange(cat)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                    
                    {isOrganic !== undefined && (
                      <div className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                        <span>{isOrganic ? 'Organic' : 'Non-Organic'}</span>
                        <button 
                          onClick={() => setIsOrganic(undefined)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {(priceRange[0] > 0 || priceRange[1] < 100) && (
                      <div className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                        <span>₵{priceRange[0].toFixed(2)} - ₵{priceRange[1].toFixed(2)}</span>
                        <button 
                          onClick={() => setPriceRange([0, 100])}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    <button 
                      onClick={clearAllFilters}
                      className="text-green-600 text-sm hover:text-green-700"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
              
              {/* Product Grid */}
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
