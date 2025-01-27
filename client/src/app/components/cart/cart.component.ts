import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row" *ngIf="cart">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Shopping Cart</h5>
          </div>
          <div class="card-body">
            <div *ngIf="cart.items.length; else emptyCart">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of cart.items">
                      <td>
                        <div class="d-flex align-items-center">
                          <img [src]="item.product.imageUrl" [alt]="item.product.name" 
                               style="width: 50px; height: 50px; object-fit: cover" class="me-2">
                          <div>
                            <h6 class="mb-0">{{ item.product.name }}</h6>
                            <small class="text-muted">{{ item.product.category?.name }}</small>
                          </div>
                        </div>
                      </td>
                      <td>${{ item.product.price }}</td>
                      <td style="width: 150px">
                        <input type="number" class="form-control" [value]="item.quantity"
                               (change)="updateQuantity(item.productId, $event)" min="1">
                      </td>
                      <td>${{ (item.product.price * item.quantity).toFixed(2) }}</td>
                      <td>
                        <button class="btn btn-sm btn-danger" (click)="removeFromCart(item.productId)">
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ng-template #emptyCart>
              <p class="text-center mb-0">Your cart is empty</p>
            </ng-template>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Order Summary</h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>VAT (20%)</span>
              <span>${{ cart.vat.toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <strong>Total</strong>
              <strong>${{ cart.total.toFixed(2) }}</strong>
            </div>
            <button class="btn btn-primary w-100">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart: CartSummary | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(productId: number, event: any) {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart();
    });
  }
} 