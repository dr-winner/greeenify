import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from '@/hooks/useAuthContext';
import { initializePaystackPayment, paystackService } from '@/services/paystackService';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';

interface PaystackCheckoutProps {
  amount: number;
  orderId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  metadata?: Record<string, any>;
}

const PaystackCheckout = ({
  amount,
  orderId,
  onSuccess,
  onCancel,
  metadata = {}
}: PaystackCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const { isAuthenticated, userId } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!isAuthenticated || !userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a payment.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Get the current user's email from Firebase auth
    const userEmail = auth.currentUser?.email;
    
    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Your account doesn't have an email address. Please update your profile.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create a safe metadata object with no undefined values
      const safeMetadata: Record<string, any> = {};
      
      // Only add properties that are defined
      if (metadata) {
        Object.entries(metadata).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            safeMetadata[key] = value;
          }
        });
      }
      
      // Add orderId and userId only if they exist
      if (orderId) {
        safeMetadata.orderId = orderId;
      }
      safeMetadata.userId = userId;

      // Initialize payment on the server
      const { reference } = await paystackService.initiatePayment({
        amount: amount * 100, // Convert to kobo
        email: userEmail,
        userId,
        orderId: orderId || undefined,
        metadata: safeMetadata
      });

      setPaymentReference(reference);

      // Initialize Paystack payment UI
      initializePaystackPayment({
        email: userEmail,
        amount: amount,
        reference,
        onSuccess: (ref) => {
          setIsLoading(false);
          verifyPayment(ref);
        },
        onCancel: () => {
          setIsLoading(false);
          toast({
            title: "Payment Cancelled",
            description: "You have cancelled the payment process.",
            variant: "default"
          });
          if (onCancel) onCancel();
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initialize payment",
        variant: "destructive"
      });
    }
  };

  const verifyPayment = async (reference: string) => {
    setIsLoading(true);
    try {
      const result = await paystackService.verifyPayment({ reference });
      
      if (result.status === 'SUCCESS') {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
          variant: "default"
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: error instanceof Error ? error.message : "Failed to verify payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          Secure payment powered by Paystack
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-muted-foreground">Order Total:</span>
            <span className="text-xl font-semibold">₵{amount.toLocaleString()}</span>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              Your payment is secure. We use Paystack's secure payment gateway to process your transaction.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePayment} 
          disabled={isLoading} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaystackCheckout;
