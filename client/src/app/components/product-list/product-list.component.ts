import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, Category } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
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
  totalPages = 1;
  isLoading = false;
  cart: CartSummary = {
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    itemCount: 0
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService
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
        console.error('Error loading cart:', error);
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
        console.error('Error loading categories:', error);
        this.categories = [];
      }
    });
  }

  loadProducts(): void {
    console.log('Loading products with params:', {
      page: this.currentPage,
      pageSize: this.pageSize,
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

    this.isLoading = true;

    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.selectedCategory,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (response) => {
        console.log('Raw API response:', response);
        if (Array.isArray(response)) {
          this.products = response;
          this.totalItems = response.length;
          this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
          console.log('Products loaded successfully:', {
            products: this.products,
            totalItems: this.totalItems,
            totalPages: this.totalPages
          });
        } else if (response && response.products) {
          this.products = response.products;
          this.totalItems = response.totalItems;
          this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
        } else {
          console.error('Invalid API response format:', response);
          this.products = [];
          this.totalItems = 0;
          this.totalPages = 1;
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.totalItems = 0;
        this.totalPages = 1;
      },
      complete: () => {
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
    this.cartService.addToCart(productId).subscribe();
  }

  updateQuantity(productId: number, quantity: string): void {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      this.cartService.updateQuantity(productId, newQuantity).subscribe();
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe();
  }

  getQuantityInCart(productId: number): number {
    const cartItem = this.cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }
} 