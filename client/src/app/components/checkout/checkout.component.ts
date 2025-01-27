import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartSummary } from '../../models/cart.model';
import { ShippingInfo } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  cart: CartSummary | null = null;
  shippingInfo: ShippingInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  };
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      if (cart.items.length === 0) {
        this.router.navigate(['/cart']);
        return;
      }
      this.cart = cart;
    });
  }

  onSubmit() {
    if (!this.cart || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const orderRequest = {
      cartId: this.cartService.getCartId(),
      shippingInfo: this.shippingInfo
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (order) => {
        // Clear the cart after successful order placement
        this.cartService.clearCart().subscribe(() => {
          // Navigate to order confirmation page (you'll need to create this)
          this.router.navigate(['/orders', order.id]);
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to place order. Please try again.';
        console.error('Order placement error:', error);
      }
    });
  }
} 