import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from '@/hooks/useCart';
import { DeliveryOption } from "./types";

interface OrderSummaryProps {
  selectedDeliveryOption?: DeliveryOption;
}

const OrderSummary = ({ selectedDeliveryOption }: OrderSummaryProps) => {
  const { items, subtotal } = useCart();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.slice(0, 3).map((item) => (
            <div key={item.product.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium">
                ₵{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          
          {items.length > 3 && (
            <p className="text-sm text-gray-500 text-center">
              +{items.length - 3} more items
            </p>
          )}
        </div>
        
        <div className="space-y-1 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₵{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between font-medium text-base border-t pt-3 mt-3">
            <span>Total</span>
            <span>₵{subtotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
