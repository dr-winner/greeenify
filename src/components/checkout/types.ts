import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

export interface MobileMoneyDetails {
  phoneNumber: string;
  provider: string;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
}

export interface CheckoutData {
  shippingInfo: ShippingAddress;
  shippingAddress: ShippingAddress; 
  deliveryOption: string;
  deliveryDate?: string;
  deliveryTime?: string;
  paymentMethod: string;
  cardDetails?: Partial<CardDetails>;
  mobileMoneyDetails?: Partial<MobileMoneyDetails>;
  paymentCompleted?: boolean;
}

// For the final submission, we ensure all required fields are present
export interface CompleteCheckoutData extends Omit<CheckoutData, 'cardDetails' | 'mobileMoneyDetails'> {
  cardDetails?: CardDetails;
  mobileMoneyDetails?: MobileMoneyDetails;
}
