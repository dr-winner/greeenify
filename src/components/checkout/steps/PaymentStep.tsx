
import { Label } from "@/components/ui/label";
import { CheckoutData } from "../types";
import PaymentMethodOptions from "./payment/PaymentMethodOptions";
import CreditCardForm from "./payment/CreditCardForm";
import MobileMoneyForm from "./payment/MobileMoneyForm";
import BankTransferInfo from "./payment/BankTransferInfo";

interface PaymentStepProps {
  checkoutData: CheckoutData;
  onUpdateCheckoutData: (data: Partial<CheckoutData>) => void;
}

const PaymentStep = ({ checkoutData, onUpdateCheckoutData }: PaymentStepProps) => {
  const handlePaymentMethodChange = (value: string) => {
    onUpdateCheckoutData({ paymentMethod: value });
  };
  
  const handleCardDetailsChange = (cardDetails: Partial<CheckoutData['cardDetails']>) => {
    onUpdateCheckoutData({ cardDetails });
  };
  
  const handleMobileMoneyDetailsChange = (mobileMoneyDetails: Partial<CheckoutData['mobileMoneyDetails']>) => {
    onUpdateCheckoutData({ mobileMoneyDetails });
  };
  
  return (
    <div className="space-y-6">
      <PaymentMethodOptions 
        selectedMethod={checkoutData.paymentMethod}
        onMethodChange={handlePaymentMethodChange}
      />
      
      {checkoutData.paymentMethod === 'credit-card' && (
        <CreditCardForm 
          cardDetails={checkoutData.cardDetails}
          onCardDetailsChange={handleCardDetailsChange}
        />
      )}
      
      {checkoutData.paymentMethod === 'mobile-money' && (
        <MobileMoneyForm 
          mobileMoneyDetails={checkoutData.mobileMoneyDetails}
          onMobileMoneyDetailsChange={handleMobileMoneyDetailsChange}
        />
      )}
      
      {checkoutData.paymentMethod === 'bank-transfer' && (
        <BankTransferInfo />
      )}
    </div>
  );
};

export default PaymentStep;
