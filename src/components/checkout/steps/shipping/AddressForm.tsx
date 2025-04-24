import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckoutData } from "../../types";

interface AddressFormProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
}

const AddressForm = ({ checkoutData, onUpdateCheckoutData }: AddressFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="Enter your full name"
            defaultValue={checkoutData.shippingInfo.fullName} 
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, fullName: e.target.value } 
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter your phone number"
            defaultValue={checkoutData.shippingInfo.phoneNumber}
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, phoneNumber: e.target.value } 
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
