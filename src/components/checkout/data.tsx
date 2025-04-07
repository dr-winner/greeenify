
import { Calendar, Clock, CreditCard, Home, Truck } from "lucide-react";
import { DeliveryOption, PaymentMethod } from "./types";

export const deliveryOptions: DeliveryOption[] = [
  { 
    id: 'standard', 
    name: 'Standard Delivery', 
    description: 'Delivery in 2-3 business days', 
    price: 50.00,
    icon: Truck
  },
  { 
    id: 'express', 
    name: 'Express Delivery', 
    description: 'Delivery in 24 hours', 
    price: 100.00,
    icon: Truck
  },
  { 
    id: 'scheduled', 
    name: 'Scheduled Delivery', 
    description: 'Choose your preferred delivery time', 
    price: 75.00,
    icon: Calendar
  },
  { 
    id: 'pickup', 
    name: 'Local Pickup', 
    description: 'Pick up from our distribution center', 
    price: 0,
    icon: Home
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
  { id: 'mobile-money', name: 'Mobile Money', icon: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zm5-4H7V4h10v12z"/>
    </svg>
  )},
  { id: 'bank-transfer', name: 'Bank Transfer', icon: () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
    </svg>
  )}
];
