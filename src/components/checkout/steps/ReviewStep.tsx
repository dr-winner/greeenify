
import { CreditCard } from "lucide-react";
import { deliveryOptions } from "../data";
import { CheckoutData } from "../types";

interface ReviewStepProps {
  checkoutData: CheckoutData;
}

const ReviewStep = ({ checkoutData }: ReviewStepProps) => {
  const selectedDeliveryOption = deliveryOptions.find(option => option.id === checkoutData.deliveryOption);
  const DeliveryIcon = selectedDeliveryOption?.icon || (() => null);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Shipping Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>
            <p>{checkoutData.shippingInfo.fullName}</p>
          </div>
          <div>
            <span className="text-gray-500">Phone:</span>
            <p>{checkoutData.shippingInfo.phoneNumber}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address:</span>
            <p>{checkoutData.shippingInfo.address}, {checkoutData.shippingInfo.city}, {checkoutData.shippingInfo.region} {checkoutData.shippingInfo.postalCode}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Delivery Option:</span>
            <div className="flex items-center mt-1">
              <DeliveryIcon className="h-5 w-5 text-green-600 mr-2" />
              <span>{selectedDeliveryOption?.name}</span>
              {checkoutData.deliveryOption === 'scheduled' && checkoutData.deliveryDate && checkoutData.deliveryTime && (
                <span className="ml-2 text-gray-600">
                  ({checkoutData.deliveryDate} at {checkoutData.deliveryTime})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4 space-y-4">
        <h3 className="font-medium text-lg">Payment Method</h3>
        <div className="flex items-center">
          {checkoutData.paymentMethod === 'credit-card' && (
            <>
              <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
              <span>Credit Card {checkoutData.cardDetails?.cardNumber ? `ending in ${checkoutData.cardDetails.cardNumber.slice(-4)}` : ''}</span>
            </>
          )}
          {checkoutData.paymentMethod === 'mobile-money' && (
            <>
              <svg className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zm5-4H7V4h10v12z"/>
              </svg>
              <span>Mobile Money {checkoutData.mobileMoneyDetails?.phoneNumber ? `(${checkoutData.mobileMoneyDetails.phoneNumber})` : ''}</span>
            </>
          )}
          {checkoutData.paymentMethod === 'bank-transfer' && (
            <>
              <svg className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
              </svg>
              <span>Bank Transfer</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
