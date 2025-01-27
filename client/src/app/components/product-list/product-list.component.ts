import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Product, Category } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbPagination],
  template: `
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Products</h5>
          </div>
          <div class="card-body">
            <!-- Filters -->
            <div class="row mb-3">
              <div class="col-md-4">
                <select class="form-select" [(ngModel)]="selectedCategory" (change)="loadProducts()">
                  <option [ngValue]="null">All Categories</option>
                  <option *ngFor="let category of categories" [ngValue]="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <input type="number" class="form-control" placeholder="Min Price" 
                       [(ngModel)]="minPrice" (change)="loadProducts()">
              </div>
              <div class="col-md-4">
                <input type="number" class="form-control" placeholder="Max Price" 
                       [(ngModel)]="maxPrice" (change)="loadProducts()">
              </div>
            </div>

            <!-- Product Grid -->
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div class="col" *ngFor="let product of products">
                <div class="card h-100">
                  <img [src]="product.imageUrl" class="card-img-top" [alt]="product.name">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text"><strong>Price: ${{ product.price }}</strong></p>
                    <div class="d-flex justify-content-between align-items-center">
                      <button class="btn btn-primary" (click)="addToCart(product)">
                        Add to Cart
                      </button>
                      <a [routerLink]="['/products', product.id]" class="btn btn-outline-secondary">
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="d-flex justify-content-center mt-4">
              <ngb-pagination
                [collectionSize]="totalItems"
                [(page)]="currentPage"
                [pageSize]="pageSize"
                (pageChange)="loadProducts()"
              ></ngb-pagination>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Cart</h5>
          </div>
          <div class="card-body">
            <div *ngIf="cart?.items?.length; else emptyCart">
              <div *ngFor="let item of cart.items" class="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <span>{{ item.product.name }}</span>
                  <br>
                  <small class="text-muted">${{ item.product.price }} × {{ item.quantity }}</small>
                </div>
                <div class="d-flex align-items-center">
                  <input type="number" class="form-control form-control-sm me-2" style="width: 60px"
                         [value]="item.quantity" (change)="updateQuantity(item.productId, $event)">
                  <button class="btn btn-sm btn-danger" (click)="removeFromCart(item.productId)">×</button>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${{ cart.subtotal.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>VAT (20%):</span>
                <span>${{ cart.vat.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between fw-bold mt-2">
                <span>Total:</span>
                <span>${{ cart.total.toFixed(2) }}</span>
              </div>
            </div>
            <ng-template #emptyCart>
              <p class="text-center mb-0">Your cart is empty</p>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  cart: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.loadCart();
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts() {
    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.minPrice || undefined,
      this.maxPrice || undefined,
      this.selectedCategory || undefined
    ).subscribe(products => {
      this.products = products;
      // Get total count from headers
      const totalCount = products.length; // This should come from headers
      this.totalItems = totalCount;
    });
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product.id, 1).subscribe(() => {
      this.loadCart();
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