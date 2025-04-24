import { DeliveryOption, PaymentMethod } from './types';
import { Truck, Clock, CreditCard, Landmark, Phone, CreditCardIcon, Store } from 'lucide-react';

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'pickup',
    name: 'Store Pickup',
    description: 'Pick up from our designated locations',
    price: 0.00,
    icon: Store,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'paystack',
    name: 'Pay with Paystack',
    icon: CreditCardIcon,
  }
];

export const regions = [
  'Greater Accra',
  'Ashanti',
  'Western',
  'Eastern',
  'Central',
  'Northern',
  'Volta',
  'Brong-Ahafo',
  'Upper East',
  'Upper West',
];
