import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';
import { ErrorService } from '../../services/error.service';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorAlertComponent],
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  cart: CartSummary | null = null;

  constructor(
    private cartService: CartService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(itemId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }
} 