
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedServices } from './UserFlowController';
import { ArrowLeft, ShoppingBasket, Warehouse, Truck, Check } from "lucide-react";

interface ServiceSelectionStepProps {
  initialServices: SelectedServices;
  onSubmit: (services: SelectedServices) => void;
  onBack: () => void;
}

const services = [
  {
    id: 'marketplace',
    title: 'Marketplace',
    description: 'Browse and buy fresh produce directly from local farmers',
    icon: ShoppingBasket,
    benefits: ['Direct farmer-to-consumer shopping', 'Fresh seasonal produce', 'Support local agriculture'],
    color: 'bg-green-500',
  },
  {
    id: 'storage',
    title: 'Storage Solution',
    description: 'Store your bulk purchases in our climate-controlled facilities',
    icon: Warehouse,
    benefits: ['Extend shelf life of produce', 'Secure, temperature-controlled storage', 'Reduce food waste'],
    color: 'bg-blue-500',
  },
  {
    id: 'transport',
    title: 'Transport & Delivery',
    description: 'Schedule deliveries or transport for your purchases',
    icon: Truck,
    benefits: ['Flexible delivery scheduling', 'Eco-friendly transportation', 'Farm-to-door service'],
    color: 'bg-amber-500',
  },
];

const ServiceSelectionStep = ({ initialServices, onSubmit, onBack }: ServiceSelectionStepProps) => {
  const [selectedServices, setSelectedServices] = useState<SelectedServices>(initialServices);
  
  const toggleService = (serviceId: keyof SelectedServices) => {
    setSelectedServices(current => ({
      ...current,
      [serviceId]: !current[serviceId]
    }));
  };
  
  const isAnyServiceSelected = Object.values(selectedServices).some(value => value);
  
  const handleSubmit = () => {
    if (isAnyServiceSelected) {
      onSubmit(selectedServices);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => {
            const serviceId = service.id as keyof SelectedServices;
            const isSelected = selectedServices[serviceId];
            const ServiceIcon = service.icon;
            
            return (
              <Card 
                key={service.id} 
                className={`relative cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => toggleService(serviceId)}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg p-2 ${service.color} text-white`}>
                      <ServiceIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-between pt-3">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isAnyServiceSelected}
            className="bg-green-600 hover:bg-green-700"
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
