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
  selectedCategory: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 1;
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
    this.productService.getProducts(
      this.currentPage,
      this.pageSize,
      this.selectedCategory,
      this.minPrice,
      this.maxPrice
    ).subscribe(response => {
      this.products = response.products;
      this.totalItems = response.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
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