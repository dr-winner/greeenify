export enum UserRole {
  ADMIN = 'ADMIN',
  FARMER = 'FARMER',
  USER = 'USER'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
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
