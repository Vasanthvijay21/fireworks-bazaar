export type Category =
  | "Sparklers"
  | "Rockets"
  | "FlowerPots"
  | "GroundChakkar"
  | "AerialShots"
  | "Bombs"
  | "Novelty";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // INR
  imageUrl: string;
  category: Category;
  packSize: string;
  effectDuration: string;
  safetyRating: number; // 1-5
  minAge: number;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
