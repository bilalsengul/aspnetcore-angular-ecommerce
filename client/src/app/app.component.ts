import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartSummary } from './models/cart.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartSummary: CartSummary = {
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    itemCount: 0
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cartSummary = cart;
    });
  }
}
