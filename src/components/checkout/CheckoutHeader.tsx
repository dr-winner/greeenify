import { CardTitle, CardDescription } from "@/components/ui/card";

interface CheckoutHeaderProps {
  activeStep: 'shipping' | 'payment';
}

const CheckoutHeader = ({ activeStep }: CheckoutHeaderProps) => {
  return (
    <>
      <CardTitle>
        {activeStep === 'shipping' && 'Shipping Information'}
        {activeStep === 'payment' && 'Payment Method'}
      </CardTitle>
      <CardDescription>
        {activeStep === 'shipping' && 'Choose your delivery options'}
        {activeStep === 'payment' && 'Complete your order with Paystack'}
      </CardDescription>
    </>
  );
};

export default CheckoutHeader;
