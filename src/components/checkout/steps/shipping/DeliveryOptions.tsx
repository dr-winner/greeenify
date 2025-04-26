
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { deliveryOptions } from "../../data";

interface DeliveryOptionsProps {
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const DeliveryOptions = ({ selectedOption, onOptionChange }: DeliveryOptionsProps) => {
  return (
    <div className="space-y-3">
      <Label>Delivery Options</Label>
      <RadioGroup 
        value={selectedOption} 
        onValueChange={onOptionChange}
      >
        {deliveryOptions.map((option) => {
          const OptionIcon = option.icon;
          return (
            <div 
              key={option.id} 
              className={`flex items-center space-x-2 border rounded-lg p-4 ${
                selectedOption === option.id ? 'border-green-600 bg-green-50' : ''
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 flex items-start cursor-pointer">
                <OptionIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium">{option.name}</span>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <span className="ml-auto font-medium">
                  {option.price === 0 ? 'Free' : `₵${option.price.toFixed(2)}`}
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default DeliveryOptions;
