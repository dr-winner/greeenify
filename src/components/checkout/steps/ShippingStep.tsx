
import { CheckoutData } from "../types";
import AddressForm from './shipping/AddressForm';
import DeliveryOptions from './shipping/DeliveryOptions';
import ScheduledDelivery from './shipping/ScheduledDelivery';

interface ShippingStepProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
  onContinue: () => void;
}

const ShippingStep = ({ checkoutData, onUpdateCheckoutData, onContinue }: ShippingStepProps) => {
  const handleDeliveryOptionChange = (value: string) => {
    onUpdateCheckoutData({ deliveryOption: value });
  };
  
  return (
    <div className="space-y-6">
      <AddressForm 
        checkoutData={checkoutData} 
        onUpdateCheckoutData={onUpdateCheckoutData} 
      />
      
      <DeliveryOptions
        selectedOption={checkoutData.deliveryOption}
        onOptionChange={handleDeliveryOptionChange}
      />
      
      {checkoutData.deliveryOption === 'scheduled' && (
        <ScheduledDelivery
          checkoutData={checkoutData}
          onUpdateCheckoutData={onUpdateCheckoutData}
        />
      )}
    </div>
  );
};

export default ShippingStep;
