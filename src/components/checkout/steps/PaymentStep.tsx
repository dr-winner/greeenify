import { Label } from "@/components/ui/label";
import { CheckoutData } from "../types";
import PaystackCheckout from "@/components/checkout/PaystackCheckout";
import { useCart } from "@/hooks/useCart";
import { CreditCardIcon } from "lucide-react";

interface PaymentStepProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
}

const PaymentStep = ({ checkoutData, onUpdateCheckoutData }: PaymentStepProps) => {
  const { total } = useCart();
  
  // Always ensure paymentMethod is set to paystack
  if (checkoutData.paymentMethod !== 'paystack') {
    onUpdateCheckoutData({ paymentMethod: 'paystack' });
  }
  
  const handlePaymentSuccess = () => {
    onUpdateCheckoutData({ paymentCompleted: true });
  };
  
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 border-green-600 bg-green-50">
        <div className="flex items-center space-x-3">
          <CreditCardIcon className="h-5 w-5 text-gray-600" />
          <Label className="text-lg font-medium">Pay with Paystack</Label>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Securely pay with your credit or debit card via Paystack.
        </p>
      </div>
      
      <PaystackCheckout 
        amount={total}
        metadata={{
          shippingAddress: checkoutData.shippingAddress,
          deliveryOption: checkoutData.deliveryOption
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PaymentStep;
