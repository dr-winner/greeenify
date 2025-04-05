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

// Sample products data - typically this would come from an API
const allProducts = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet and juicy organic strawberries, freshly picked from our fields.",
    price: 25.00,
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
    price: 15.00,
    unit: "per kg",
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
    price: 35.00,
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
    price: 10.00,
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
    price: 85.00,
    unit: "per kg",
    image: "https://imgs.search.brave.com/VBW-uPOe0NX0MZs6NUQXDmnWLbG1S_WCEMEzRYTMcfw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93aGl0/ZW9ha3Bhc3R1cmVz/LmNvbS9jZG4vc2hv/cC9jb2xsZWN0aW9u/cy8yMDA1MTEtNG96/LWJ1cmdlci1ncm91/bmQtYmVlZi1wYXR0/aWVzLXNwcmluZy1z/dW1tZXItZmFsbC11/bmNvb2tlZC1iZWVm/LTYwMHg2MDBfMzE4/ZTRhOTYtYjBhNy00/YzVmLWFjNjctZmY3/NmQxYWVlZjVlLmpw/Zz92PTE2MTY3OTI2/MjYmd2lkdGg9MTA4/MA",
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
    price: 45.00,
    unit: "500g jar",
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
    price: 12.00,
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
    price: 55.00,
    unit: "250g",
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
    price: 20.00,
    unit: "per kg",
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
    price: 30.00,
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
    price: 12.00,
    unit: "per kg",
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
    price: 65.00,
    unit: "250ml bottle",
    image: "https://images.unsplash.com/photo-1589418434246-01b91a345f4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
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
    description: "Ripe plantains perfect for frying or making local dishes.",
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
    description: "Fresh cassava roots, perfect for traditional dishes.",
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
    description: "Locally produced red palm oil, rich in nutrients.",
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
    description: "Premium quality cocoa beans from local farmers.",
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
    description: "Sweet and juicy local pineapples.",
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
    description: "Sweet and ripe local mangoes.",
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
    description: "Locally grown and roasted peanuts.",
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
    description: "Fresh and aromatic local ginger root.",
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
    description: "Fresh turmeric root with intense flavor.",
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
    description: "Fresh young coconuts with sweet water.",
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
    description: "Sweet and ripe local papayas.",
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
    description: "Sweet and juicy local watermelons.",
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
                          <span className="text-sm">${priceRange[0].toFixed(2)}</span>
                          <span className="text-sm">${priceRange[1].toFixed(2)}</span>
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
