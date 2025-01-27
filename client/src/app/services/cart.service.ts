import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { CartItem, CartSummary } from '../models/cart.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  private cartId: string;
  private cartSubject = new BehaviorSubject<CartSummary>({
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    itemCount: 0
  });

  constructor(private http: HttpClient) {
    this.cartId = this.getOrCreateCartId();
    this.loadCart();
  }

  private getOrCreateCartId(): string {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = this.generateCartId();
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
  }

  private generateCartId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private loadCart(): void {
    this.getCart().subscribe();
  }

  getCart(): Observable<CartSummary> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${this.cartId}`).pipe(
      map(items => {
        const summary: CartSummary = {
          items,
          subtotal: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          vat: 0,
          total: 0,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
        };
        summary.vat = summary.subtotal * 0.2; // 20% VAT
        summary.total = summary.subtotal + summary.vat;
        this.cartSubject.next(summary);
        return summary;
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<CartSummary> {
    const cartItem = {
      cartId: this.cartId,
      productId,
      quantity
    };
    return this.http.post<CartItem>(`${this.apiUrl}`, cartItem).pipe(
      switchMap(() => this.getCart())
    );
  }

  updateQuantity(itemId: number, quantity: number): Observable<CartSummary> {
    return this.http.put<CartItem>(`${this.apiUrl}/${itemId}`, { id: itemId, quantity }).pipe(
      switchMap(() => this.getCart())
    );
  }

  removeFromCart(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => this.loadCart())
    );
  }

  getCartObservable(): Observable<CartSummary> {
    return this.cartSubject.asObservable();
  }
} 