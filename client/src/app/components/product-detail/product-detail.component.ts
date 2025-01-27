import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <ng-container *ngIf="product">
      <div class="row">
        <div class="col-md-6">
          <img [src]="product.imageUrl" [alt]="product.name" class="img-fluid">
        </div>
        <div class="col-md-6">
          <h2>{{ product.name }}</h2>
          <p class="text-muted">Category: {{ product.category?.name }}</p>
          <p>{{ product.description }}</p>
          <h3 class="mb-3">${{ product.price }}</h3>
          
          <div class="d-flex align-items-center mb-3">
            <label class="me-2">Quantity:</label>
            <input type="number" class="form-control" style="width: 100px"
                   [(ngModel)]="quantity" min="1">
          </div>
          
          <button class="btn btn-primary" (click)="addToCart()">
            Add to Cart
          </button>
        </div>
      </div>
    </ng-container>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(parseInt(id));
    }
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  addToCart() {
    if (this.product && this.quantity > 0) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe();
    }
  }
} 