
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Thermometer, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const storageOptions = [
  {
    id: 'standard',
    title: 'Standard Storage',
    price: 29.99,
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
    price: 49.99,
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
    price: 199.99,
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

const StoragePlans = () => {
  const { toast } = useToast();
  
  const handlePlanSelect = (planId: string) => {
    toast({
      title: "Storage Plan Selected",
      description: "You'll be redirected to checkout to complete your purchase.",
    });
  };

  return (
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
  );
};

export default StoragePlans;
