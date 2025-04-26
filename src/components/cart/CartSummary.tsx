
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/components/ui/use-toast";

const CartSummary = () => {
  const { subtotal, total, shippingCost } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    
    // Real API call to validate promo code
    fetch('https://api.yourbackend.com/api/promos/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
      },
      body: JSON.stringify({ code: promoCode }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid promo code');
      }
      return response.json();
    })
    .then(data => {
      toast({
        title: "Promo applied!",
        description: `${data.discount}% discount has been applied to your order.`,
      });
      setPromoCode('');
    })
    .catch(error => {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or has expired.",
        variant: "destructive",
      });
      setPromoCode('');
    });
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    navigate('/checkout');
  };
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-heading font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₵{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>₵{shippingCost.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₵{total.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Promo Code */}
        <form onSubmit={handleApplyPromo} className="mb-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline">Apply</Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Try "GREENIFY10" for 10% off
          </p>
        </form>
        
        {/* Checkout Button */}
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? 'Processing...' : 'Checkout'}
          {!isCheckingOut && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
        
        {/* Secure checkout message */}
        <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
