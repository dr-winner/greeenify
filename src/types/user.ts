
export type UserRole = 'buyer' | 'farmer';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  avatar?: string;
  joinedDate: Date;
}

export interface FarmerProfile extends UserProfile {
  farmName?: string;
  farmLocation?: string;
  farmDescription?: string;
  products?: string[];
  ratings?: number;
  reviewCount?: number;
}

export interface BuyerProfile extends UserProfile {
  preferredPaymentMethod?: string;
  favoriteProducts?: string[];
  orderCount?: number;
}
