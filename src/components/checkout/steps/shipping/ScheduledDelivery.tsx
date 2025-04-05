
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Calendar, Clock } from "lucide-react";
import { CheckoutData } from "../../types";

interface ScheduledDeliveryProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
}

const ScheduledDelivery = ({ checkoutData, onUpdateCheckoutData }: ScheduledDeliveryProps) => {
  const [isSchedulingDelivery, setIsSchedulingDelivery] = useState(false);
  
  const handleScheduleConfirm = () => {
    setIsSchedulingDelivery(false);
  };
  
  return (
    <Sheet open={isSchedulingDelivery} onOpenChange={setIsSchedulingDelivery}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Calendar className="h-5 w-5 mr-2" />
          {checkoutData.deliveryDate && checkoutData.deliveryTime 
            ? `Scheduled for ${checkoutData.deliveryDate} at ${checkoutData.deliveryTime}` 
            : 'Schedule Your Delivery'
          }
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Schedule Your Delivery</SheetTitle>
          <SheetDescription>
            Choose your preferred delivery date and time
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Delivery Date</Label>
            <div className="flex">
              <div className="bg-green-100 p-2 rounded-l-md">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <Input
                id="delivery-date"
                type="date"
                value={checkoutData.deliveryDate || ''}
                onChange={(e) => onUpdateCheckoutData({ deliveryDate: e.target.value })}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="delivery-time">Delivery Time</Label>
            <div className="flex">
              <div className="bg-green-100 p-2 rounded-l-md">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <Input
                id="delivery-time"
                type="time"
                value={checkoutData.deliveryTime || ''}
                onChange={(e) => onUpdateCheckoutData({ deliveryTime: e.target.value })}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleScheduleConfirm}
            >
              Confirm Schedule
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduledDelivery;
