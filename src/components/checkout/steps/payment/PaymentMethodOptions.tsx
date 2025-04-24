import { paymentMethods } from "../../data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethodOptionsProps {
  selectedMethod: string;
  onMethodChange: (value: string) => void;
}

const PaymentMethodOptions = ({ selectedMethod, onMethodChange }: PaymentMethodOptionsProps) => {
  // Since we only have Paystack now, we can set it automatically
  if (selectedMethod !== 'paystack') {
    onMethodChange('paystack');
  }
  
  return (
    <div className="space-y-3">
      <Label>Payment Method</Label>
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        {paymentMethods.map((method) => {
          const PaymentIcon = method.icon;
          return (
            <div key={method.id} className="flex items-center space-x-2 border rounded-lg p-4 border-green-600 bg-green-50">
              <RadioGroupItem value={method.id} id={method.id} checked />
              <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer">
                <PaymentIcon className="h-5 w-5 text-gray-600" />
                <span>{method.name}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodOptions;
