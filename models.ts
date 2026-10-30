/** Shared application models. No database connection or runtime validation. */
export type UserRole = 'customer' | 'admin';
export type ProductType = 'physical' | 'digital';
export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled';

/** Milliseconds since the Unix epoch, for example Date.now(). */
export type Timestamp = number;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registeredAt: Timestamp;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Non-negative integer amount in Iraqi dinars (IQD). */
  price: number;
  imageUrl: string;
  type: ProductType;
  /** Ordered PDF/video URLs or storage paths. Empty for physical products. */
  fileUrls: string[];
}

export interface OrderItem {
  productId: Product['id'];
  /** Purchase-time name snapshot; do not derive old invoices from the catalog. */
  productName: string;
  /** Integer quantity greater than zero. */
  quantity: number;
  /** Purchase-time UNIT price in IQD, not the line total. */
  price: number;
}

export interface Order {
  id: string;
  userId: User['id'];
  items: OrderItem[];
  /** Sum of each item's price * quantity, in IQD. */
  total: number;
  status: OrderStatus;
  createdAt: Timestamp;
}
