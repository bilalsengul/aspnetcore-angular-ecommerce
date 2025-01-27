import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Product, Category } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../models/cart.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbPagination],
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
    this.loadCategories();
    this.loadProducts();
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
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
    
    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.selectedCategory,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (response) => {
        console.log('Products loaded:', response);
        this.products = response.products;
        this.totalItems = response.totalItems;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  onCategoryChange(categoryId: number | undefined): void {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.loadProducts();
  }

  onPriceFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId).subscribe();
  }

  updateQuantity(itemId: number, quantity: string | number): void {
    const numericQuantity = Number(quantity);
    if (numericQuantity > 0) {
      this.cartService.updateQuantity(itemId, numericQuantity).subscribe();
    } else {
      this.removeFromCart(itemId);
    }
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe();
  }

  getQuantityInCart(productId: number): number {
    const cartItem = this.cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }
} 