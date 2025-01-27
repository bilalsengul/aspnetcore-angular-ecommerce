import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem, CartSummary } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5112/api';
  private cartId: string;
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cartId = localStorage.getItem('cartId') || this.generateCartId();
    this.loadCart();
  }

  private generateCartId(): string {
    const cartId = 'cart_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  private loadCart(): void {
    this.getCart().subscribe(
      cart => this.cartItemCountSubject.next(cart.itemCount)
    );
  }

  getCart(): Observable<CartSummary> {
    return this.http.get<CartSummary>(`${this.apiUrl}/cart/${this.cartId}`);
  }

  addToCart(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cart`, {
      cartId: this.cartId,
      productId: productId,
      quantity: quantity
    }).pipe(
      tap(() => this.loadCart())
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/cart/${this.cartId}/items/${productId}`,
      { quantity }
    ).pipe(
      tap(() => this.loadCart())
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/cart/${this.cartId}/items/${productId}`
    ).pipe(
      tap(() => this.loadCart())
    );
  }
} 