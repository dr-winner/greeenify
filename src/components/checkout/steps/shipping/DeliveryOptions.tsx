import { Label } from "@/components/ui/label";
import { deliveryOptions } from "../../data";
import { useEffect } from "react";

interface DeliveryOptionsProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const DeliveryOptions = ({ selectedOption, onOptionChange }: DeliveryOptionsProps) => {
  // Automatically set to pickup if not already
  useEffect(() => {
    if (selectedOption !== 'pickup') {
      onOptionChange('pickup');
    }
  }, [selectedOption, onOptionChange]);

  const option = deliveryOptions[0]; // Only one option now (Store Pickup)
  const OptionIcon = option.icon;

  return (
    <div className="space-y-3 mt-8">
      <h3 className="text-lg font-medium">Delivery Method</h3>
      <div className="border rounded-lg p-4 border-green-600 bg-green-50">
        <div className="flex items-start">
          <OptionIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
          <div className="flex-1">
            <span className="font-medium">{option.name}</span>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
          <span className="ml-auto font-medium text-green-600">
            Free
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 italic">
        Note: Currently only store pickup is available. Please bring your ID when picking up your order.
      </p>
    </div>
  );
};

export default DeliveryOptions;
