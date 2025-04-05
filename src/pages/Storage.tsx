import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Box, Thermometer, Shield, Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const storageOptions = [
  {
    id: 'standard',
    title: 'Standard Storage',
    price: 150.00,
    duration: '1 month',
    features: [
      'Temperature-controlled environment',
      'Weekly status reports',
      'Up to 20 cubic feet of space',
      'Basic security measures'
    ],
    icon: Box,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'premium',
    title: 'Premium Storage',
    price: 250.00,
    duration: '1 month',
    features: [
      'Precision temperature & humidity control',
      'Daily monitoring and reports',
      'Up to 40 cubic feet of space',
      'Advanced security with notifications',
      'Priority access and retrieval'
    ],
    icon: Thermometer,
    color: 'bg-purple-100 text-purple-700',
    recommended: true
  },
  {
    id: 'seasonal',
    title: 'Seasonal Storage',
    price: 1200.00,
    duration: '6 months',
    features: [
      'Ideal for long-term produce storage',
      'Custom temperature settings',
      'Up to 60 cubic feet of space',
      'Inventory management system',
      'Priority support and insurance included'
    ],
    icon: Calendar,
    color: 'bg-amber-100 text-amber-700'
  }
];

const Storage = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const { toast } = useToast();
  
  const handlePlanSelect = (planId: string) => {
    toast({
      title: "Storage Plan Selected",
      description: "You'll be redirected to checkout to complete your purchase.",
    });
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Greenify Storage Solutions</h1>
            <p className="text-lg text-gray-600">
              Store your bulk produce purchases in our state-of-the-art climate-controlled facilities 
              to maintain freshness and reduce waste.
            </p>
          </div>
          
          <Tabs defaultValue="plans" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="plans">Storage Plans</TabsTrigger>
              <TabsTrigger value="how">How It Works</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans" className="pt-4">
              <div className="grid md:grid-cols-3 gap-6">
                {storageOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card key={option.id} className={`relative ${option.recommended ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
                      {option.recommended && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                          Recommended
                        </div>
                      )}
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{option.title}</CardTitle>
                        <CardDescription>
                          <span className="text-2xl font-bold">${option.price}</span>
                          <span className="text-gray-500"> / {option.duration}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className={`w-full ${option.recommended ? 'bg-green-600 hover:bg-green-700' : ''}`}
                          onClick={() => handlePlanSelect(option.id)}
                        >
                          Select Plan
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="how">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">How Greenify Storage Works</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                      <Box className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">1. Purchase Your Storage</h3>
                    <p className="text-gray-600">Select the storage plan that fits your needs and complete your purchase.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
                      <Thermometer className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">2. Store Your Produce</h3>
                    <p className="text-gray-600">Drop off your items at our facility or schedule a pickup from your recent purchases.</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full mb-4">
                      <Clock className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">3. Monitor & Retrieve</h3>
                    <p className="text-gray-600">Check the status of your items anytime and schedule retrieval when needed.</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab('plans')}>
                    View Storage Plans
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What types of produce can I store?</h3>
                    <p className="text-gray-600">You can store most types of fruits, vegetables, grains, and preserved foods. Our facilities are designed to accommodate various temperature and humidity requirements.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How do I access my stored items?</h3>
                    <p className="text-gray-600">You can schedule a retrieval through your account or visit our facility during operating hours. We require 24-hour notice for large retrievals.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Is there a limit to how much I can store?</h3>
                    <p className="text-gray-600">Each plan comes with a specified storage capacity. If you need additional space, you can purchase multiple plans or upgrade to a larger option.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How secure is my produce?</h3>
                    <p className="text-gray-600">Our facilities are secured with 24/7 monitoring, access control, and temperature alerts. Your items are inventoried and tracked throughout their storage period.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Storage;
