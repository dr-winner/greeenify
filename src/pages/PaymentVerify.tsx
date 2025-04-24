import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paystackService } from '@/services/paystackService';
import { PaymentStatus } from '@/services/firestoreService';
import { useCart } from '@/hooks/useCart';
import Layout from '@/components/layout/Layout';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PaymentVerify = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get reference from URL query parameters
        const params = new URLSearchParams(location.search);
        const reference = params.get('reference');
        
        if (!reference) {
          throw new Error('Payment reference not found');
        }
        
        // Verify payment with Paystack
        const result = await paystackService.verifyPayment({ reference });
        
        if (result.status === PaymentStatus.SUCCESS) {
          // Clear the cart on successful payment
          await clearCart();
          // Clear the pending order flag
          localStorage.removeItem('greenify_order_pending');
          setVerificationStatus('success');
          toast({
            title: "Payment Successful",
            description: "Your order has been placed successfully.",
            variant: "default",
          });
        } else {
          setVerificationStatus('failed');
          setError('Payment verification failed. Please try again or contact support.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };
    
    verifyPayment();
  }, [location.search, clearCart, toast]);
  
  const handleViewOrders = () => {
    navigate('/orders');
  };
  
  const handleReturnToShop = () => {
    navigate('/shop');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {verificationStatus === 'loading' && (
            <div className="py-12">
              <Spinner className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-gray-600">Please wait while we verify your payment...</p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your payment has been verified and your order has been placed successfully.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                <Button onClick={handleViewOrders} className="bg-green-600 hover:bg-green-700">
                  View My Orders
                </Button>
                <Button onClick={handleReturnToShop} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
          
          {verificationStatus === 'failed' && (
            <div className="py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-6">
                {error || 'There was a problem verifying your payment.'}
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                <Button onClick={() => navigate('/checkout')} className="bg-green-600 hover:bg-green-700">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/cart')} variant="outline">
                  Return to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentVerify;
