
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Calendar, Clock, MapPin } from "lucide-react";

const Transport = () => {
  const [deliveryType, setDeliveryType] = useState('standard');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [address, setAddress] = useState('');
  const { toast } = useToast();
  
  const handleScheduleDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Delivery Scheduled",
      description: `Your ${deliveryType} delivery has been scheduled for ${deliveryDate} at ${deliveryTime}.`,
    });
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Transport & Delivery</h1>
            <p className="text-lg text-gray-600">
              Schedule eco-friendly delivery for your purchases or arrange transportation for bulk orders.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="schedule">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="schedule">Schedule Delivery</TabsTrigger>
                <TabsTrigger value="options">Delivery Options</TabsTrigger>
                <TabsTrigger value="tracking">Track Delivery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="pt-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Schedule a Delivery</CardTitle>
                      <CardDescription>Select your preferred delivery options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleScheduleDelivery} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Delivery Type</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div 
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                deliveryType === 'standard' ? 'border-amber-500 bg-amber-50' : 'hover:border-gray-300'
                              }`}
                              onClick={() => setDeliveryType('standard')}
                            >
                              <div className="flex items-center mb-2">
                                <Truck className="h-5 w-5 text-amber-600 mr-2" />
                                <span className="font-medium">Standard</span>
                              </div>
                              <p className="text-sm text-gray-500">Delivery within 48 hours</p>
                              <p className="text-sm font-medium mt-2">$5.99</p>
                            </div>
                            
                            <div 
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                deliveryType === 'express' ? 'border-amber-500 bg-amber-50' : 'hover:border-gray-300'
                              }`}
                              onClick={() => setDeliveryType('express')}
                            >
                              <div className="flex items-center mb-2">
                                <Truck className="h-5 w-5 text-amber-600 mr-2" />
                                <span className="font-medium">Express</span>
                              </div>
                              <p className="text-sm text-gray-500">Same-day delivery</p>
                              <p className="text-sm font-medium mt-2">$12.99</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="deliveryDate">Delivery Date</Label>
                            <div className="flex">
                              <div className="bg-amber-100 p-2 rounded-l-md">
                                <Calendar className="h-5 w-5 text-amber-600" />
                              </div>
                              <Input
                                id="deliveryDate"
                                type="date"
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                className="rounded-l-none"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="deliveryTime">Delivery Time</Label>
                            <div className="flex">
                              <div className="bg-amber-100 p-2 rounded-l-md">
                                <Clock className="h-5 w-5 text-amber-600" />
                              </div>
                              <Input
                                id="deliveryTime"
                                type="time"
                                value={deliveryTime}
                                onChange={(e) => setDeliveryTime(e.target.value)}
                                className="rounded-l-none"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Delivery Address</Label>
                          <div className="flex">
                            <div className="bg-amber-100 p-2 rounded-l-md">
                              <MapPin className="h-5 w-5 text-amber-600" />
                            </div>
                            <Input
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Enter your delivery address"
                              className="rounded-l-none"
                              required
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 mt-4">
                          Schedule Delivery
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Delivery Summary</CardTitle>
                        <CardDescription>Your delivery details</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Delivery Type:</span>
                            <span className="font-medium capitalize">{deliveryType}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Delivery Date:</span>
                            <span className="font-medium">{deliveryDate || 'Not selected'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Delivery Time:</span>
                            <span className="font-medium">{deliveryTime || 'Not selected'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Delivery Fee:</span>
                            <span className="font-medium">{deliveryType === 'standard' ? '$5.99' : '$12.99'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Why Choose Our Delivery?</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">Eco-friendly transport options</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">Flexible scheduling</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">Real-time tracking</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">Temperature-controlled vehicles</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="options">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                        <Truck className="h-6 w-6" />
                      </div>
                      <CardTitle>Standard Delivery</CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold">$5.99</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Delivery within 48 hours
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Standard packaging
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Tracking available
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Standard</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-amber-400 shadow-lg">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-xs px-3 py-1 rounded-full">
                      Popular
                    </div>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                        <Truck className="h-6 w-6" />
                      </div>
                      <CardTitle>Express Delivery</CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold">$12.99</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Same-day delivery
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Premium packaging
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Real-time tracking
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Priority handling
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">Choose Express</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                        <Truck className="h-6 w-6" />
                      </div>
                      <CardTitle>Scheduled Delivery</CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold">$8.99</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Specific date & time
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Enhanced packaging
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Advanced tracking
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Text notifications
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Scheduled</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="tracking">
                <Card>
                  <CardHeader>
                    <CardTitle>Track Your Delivery</CardTitle>
                    <CardDescription>Enter your tracking number to see your delivery status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-w-md mx-auto">
                      <div className="flex">
                        <Input
                          placeholder="Enter tracking number"
                          className="rounded-r-none"
                        />
                        <Button className="rounded-l-none bg-amber-600 hover:bg-amber-700">
                          Track
                        </Button>
                      </div>
                      
                      <div className="mt-8 text-center">
                        <div className="mb-4">
                          <Truck className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">Enter your tracking number to see your delivery status</p>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-6">
                          Need help? Contact our support team at<br />
                          <span className="text-amber-600 font-medium">support@greenify.com</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transport;
