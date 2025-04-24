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
import { Product } from '@/types/product';

// Sample products data - typically this would come from an API
const allProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet and juicy organic strawberries, freshly picked from our fields.",
    price: 0.50,
    unit: "per basket",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    description: "Crisp, sweet organic apples, perfect for snacking or baking.",
    price: 3.99,
    unit: "per lb",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    description: "Artisan sourdough bread, freshly baked with organic flour.",
    price: 5.49,
    unit: "loaf",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    description: "Sweet, crunchy carrots harvested at peak freshness.",
    price: 2.49,
    unit: "per bunch",
    image: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    description: "Pure maple syrup, harvested and bottled by local producers.",
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

const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20]);
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
    { id: 'dairy', name: 'Dairy' },
    { id: 'meat', name: 'Meat' },
    { id: 'herbs', name: 'Herbs' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'organic', name: 'Organic' }
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
    setPriceRange([0, 20]);
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
                          max={20}
                          step={0.5}
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
              {(selectedCategories.length > 0 || isOrganic !== undefined || priceRange[0] > 0 || priceRange[1] < 20) && (
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
                    
                    {(priceRange[0] > 0 || priceRange[1] < 20) && (
                      <div className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                        <span>${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</span>
                        <button 
                          onClick={() => setPriceRange([0, 20])}
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
