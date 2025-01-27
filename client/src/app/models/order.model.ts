import { CartItem } from './cart.model';

export interface OrderRequest {
  cartId: string;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Order {
  id: number;
  orderDate: Date;
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  shippingInfo: ShippingInfo;
  status: OrderStatus;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
} 