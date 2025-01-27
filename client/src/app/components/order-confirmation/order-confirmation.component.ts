import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-body text-center">
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmationComponent {} 