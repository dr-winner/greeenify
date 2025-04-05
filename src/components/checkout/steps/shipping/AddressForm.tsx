
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckoutData } from "../../types";

interface AddressFormProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
}

const AddressForm = ({ checkoutData, onUpdateCheckoutData }: AddressFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
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
            defaultValue={checkoutData.shippingInfo.phoneNumber}
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, phoneNumber: e.target.value } 
            })}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          defaultValue={checkoutData.shippingInfo.address}
          onChange={(e) => onUpdateCheckoutData({ 
            shippingInfo: { ...checkoutData.shippingInfo, address: e.target.value } 
          })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            defaultValue={checkoutData.shippingInfo.city}
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, city: e.target.value } 
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input 
            id="region" 
            defaultValue={checkoutData.shippingInfo.region}
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, region: e.target.value } 
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input 
            id="postalCode" 
            defaultValue={checkoutData.shippingInfo.postalCode}
            onChange={(e) => onUpdateCheckoutData({ 
              shippingInfo: { ...checkoutData.shippingInfo, postalCode: e.target.value } 
            })}
          />
        </div>
      </div>
    </>
  );
};

export default AddressForm;
