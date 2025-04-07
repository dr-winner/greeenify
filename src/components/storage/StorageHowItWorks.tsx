
import { Button } from "@/components/ui/button";
import { Box, Thermometer, Clock, ChevronRight } from "lucide-react";

interface StorageHowItWorksProps {
  onViewPlans: () => void;
}

const StorageHowItWorks = ({ onViewPlans }: StorageHowItWorksProps) => {
  return (
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
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onViewPlans}>
          View Storage Plans
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StorageHowItWorks;
