import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, Category } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';
import { ErrorService } from '../../services/error.service';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ErrorAlertComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 1;
  isLoading = false;
  cart: CartSummary = {
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    itemCount: 0
  };
  isCartUpdating = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    console.log('ProductListComponent initialized');
    this.loadCategories();
    this.loadProducts();
    this.cartService.getCartObservable().subscribe({
      next: (cart) => {
        this.cart = cart || {
          items: [],
          subtotal: 0,
          vat: 0,
          total: 0,
          itemCount: 0
        };
      },
      error: (error) => {
        this.errorService.handleError(error);
        this.cart = {
          items: [],
          subtotal: 0,
          vat: 0,
          total: 0,
          itemCount: 0
        };
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        console.log('Categories loaded:', categories);
        this.categories = categories;
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    console.log('Loading products with params:', {
      page: this.currentPage,
      pageSize: this.pageSize,
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

    this.products = []; // Reset products while loading
    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.selectedCategory,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Products loaded:', response);
          this.products = response.products || [];
          this.totalItems = response.totalItems || 0;
          this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
        } else {
          this.errorService.handleError(new Error('No response received from products API'));
          this.products = [];
          this.totalItems = 0;
          this.totalPages = 1;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorService.handleError(error);
        this.products = [];
        this.totalItems = 0;
        this.totalPages = 1;
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPriceChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  addToCart(productId: number): void {
    this.isCartUpdating = true;
    
    this.cartService.addToCart(productId).subscribe({
      next: () => {
        this.isCartUpdating = false;
      },
      error: (error) => {
        this.errorService.handleError(error);
        this.isCartUpdating = false;
      }
    });
  }

  updateQuantity(itemId: number, quantity: string): void {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      this.isCartUpdating = true;
      
      this.cartService.updateQuantity(itemId, newQuantity).subscribe({
        next: () => {
          this.isCartUpdating = false;
        },
        error: (error) => {
          this.errorService.handleError(error);
          this.isCartUpdating = false;
          this.loadCart();
        }
      });
    }
  }

  removeFromCart(productId: number): void {
    this.isCartUpdating = true;
    
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.isCartUpdating = false;
      },
      error: (error) => {
        this.errorService.handleError(error);
        this.isCartUpdating = false;
        this.loadCart();
      }
    });
  }

  getQuantityInCart(productId: number): number {
    const cartItem = this.cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  private loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }
} 