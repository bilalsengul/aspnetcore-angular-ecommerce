import { Product } from './product.model';

export interface CartItem {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
    cartId: string;
}

export interface CartSummary {
    items: CartItem[];
    subtotal: number;
    vat: number;
    total: number;
    itemCount: number;
} 