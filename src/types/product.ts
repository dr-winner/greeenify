export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g., "per lb", "each", "per bunch"
  image: string;
  category: string;
  farmerName: string;
  farmerId: string;
  isOrganic: boolean;
  isFeatured: boolean;
  stock: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
