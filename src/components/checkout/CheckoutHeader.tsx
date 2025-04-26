
import { CardTitle, CardDescription } from "@/components/ui/card";

interface CheckoutHeaderProps {
  activeStep: 'shipping' | 'payment' | 'review';
}

const CheckoutHeader = ({ activeStep }: CheckoutHeaderProps) => {
  return (
    <>
      <CardTitle>
        {activeStep === 'shipping' && 'Shipping Information'}
        {activeStep === 'payment' && 'Payment Method'}
        {activeStep === 'review' && 'Review Your Order'}
      </CardTitle>
      <CardDescription>
        {activeStep === 'shipping' && 'Choose your delivery options'}
        {activeStep === 'payment' && 'Select your preferred payment method'}
        {activeStep === 'review' && 'Confirm your order details before placing the order'}
      </CardDescription>
    </>
  );
};

export default CheckoutHeader;
