
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Building, Truck } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

// Data for storage facilities by region
const regionalStorageData = [
  { no: 1, town: "Kumasi, Buokrom", region: "Ashanti", size: 1250, distance: 270 },
  { no: 2, town: "Ejura, Bedukurom", region: "Ashanti", size: 300, distance: 315 },
  { no: 3, town: "Wenchi, Opp. Methodist University", region: "Bono", size: 800, distance: 400 },
  { no: 4, town: "Afram plains, Maame Krobo", region: "Eastern", size: 1000, distance: 382 },
  { no: 5, town: "Kintampo", region: "Bono East", size: 700, distance: 478 },
  { no: 6, town: "Tamale", region: "Northern", size: 500, distance: 640 },
  { no: 7, town: "Wa", region: "Upper West", size: 400, distance: 712 },
  { no: 8, town: "Sandema", region: "Upper East", size: 250, distance: 810 }
];

// Data for warehouse providers
const warehouseData = [
  { warehouse: "Grain Leaders Ltd.", region: "Brong Ahafo", district: "Nkoranza South District", community: "Nkoranza", capacity: 500 },
  { warehouse: "Wienco (Ghana) Ltd.", region: "Northern", district: "Tamale Metro.", community: "Lamashegu", capacity: 18000 },
  { warehouse: "Gunda Produce Company Ltd.", region: "Northern", district: "Tamale Metro.", community: "Datoyili", capacity: 500 },
  { warehouse: "Savanna Farmers Marketing Company Ltd.", region: "Northern", district: "Tamale Metro.", community: "Chanzini", capacity: 1000 },
  { warehouse: "CDH Commodities Ltd.", region: "Greater Accra", district: "Accra Metro.", community: "Avenor/ Circle Close", capacity: 4600 },
  { warehouse: "AGMSIG Resource (Shekinah ABC)", region: "Northern", district: "Tolon District", community: "Nyankpala", capacity: 1000 },
  { warehouse: "BUSACA Agribusiness Company Ltd.", region: "Northern", district: "Savelugu District", community: "Savelugu", capacity: 1000 },
  { warehouse: "Premium Foods Ltd.", region: "Ashanti", district: "Kumasi Metro.", community: "Jachie-Pramso", capacity: 18000 },
  { warehouse: "Faranaya Agribusiness Co. Ltd.", region: "Northern", district: "West Mamprusi District", community: "Walewale", capacity: 1000 },
  { warehouse: "Greater Accra Poultry Farmers Association (GAPFA)", region: "Central", district: "Gomoa-Akotsi", community: "Gomoa-Akotsi", capacity: 3000 }
];

// List of unique regions for filtering
const allRegions = [...new Set([...regionalStorageData.map(item => item.region), ...warehouseData.map(item => item.region)])];

const StorageListings = () => {
  const [activeTab, setActiveTab] = useState('locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Filter function for regional storage data
  const filteredRegionalData = regionalStorageData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.town.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === null || item.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });
  
  // Filter function for warehouse data
  const filteredWarehouseData = warehouseData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.warehouse.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.community.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === null || item.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRegionSelect = (region: string | null) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };
  
  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-heading font-bold mb-4">Storage Facilities in Ghana</h1>
            <p className="text-lg text-gray-600">
              Find suitable storage facilities across different regions in Ghana for your produce.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-6xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by location, region, or facility name..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <Link to="/storage">
                <Button className="whitespace-nowrap">
                  View Storage Plans
                </Button>
              </Link>
            </div>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge 
                  variant={selectedRegion === null ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleRegionSelect(null)}
                >
                  All Regions
                </Badge>
                {allRegions.map(region => (
                  <Badge
                    key={region}
                    variant={selectedRegion === region ? "secondary" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="locations" className="max-w-6xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="locations">
                <MapPin className="mr-2 h-4 w-4" /> Regional Storage Locations
              </TabsTrigger>
              <TabsTrigger value="warehouses">
                <Building className="mr-2 h-4 w-4" /> Warehouse Providers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="locations" className="pt-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of storage locations by region in Ghana</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] text-center">No</TableHead>
                        <TableHead>Town</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead className="text-right">Size (sq ft)</TableHead>
                        <TableHead className="text-right">Distance from Accra (km)</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegionalData.length > 0 ? (
                        filteredRegionalData.map((item) => (
                          <TableRow key={item.no}>
                            <TableCell className="text-center font-medium">{item.no}</TableCell>
                            <TableCell>{item.town}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.region}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{item.size.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{item.distance}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/storage`}>
                                  Reserve
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            No storage locations found matching your criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="warehouses" className="pt-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of warehouse providers in Ghana</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Warehouse</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Municipal/District</TableHead>
                        <TableHead>Community</TableHead>
                        <TableHead className="text-right">Capacity (MT)</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWarehouseData.length > 0 ? (
                        filteredWarehouseData.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.warehouse}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.region}</Badge>
                            </TableCell>
                            <TableCell>{item.district}</TableCell>
                            <TableCell>{item.community}</TableCell>
                            <TableCell className="text-right">{item.capacity.toLocaleString()}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/storage`}>
                                  Contact
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            No warehouses found matching your criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Need a personalized storage solution? Check out our storage plans or contact our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link to="/storage">
                  View Storage Plans
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Transport Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StorageListings;
