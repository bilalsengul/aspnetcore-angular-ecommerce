import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  cart: CartSummary | null = null;
  shippingInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  onSubmit(): void {
    // Implement checkout logic
    console.log('Checkout submitted', this.shippingInfo);
  }
} 