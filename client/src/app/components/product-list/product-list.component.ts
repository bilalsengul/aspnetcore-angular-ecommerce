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
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  page = 1;
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
    this.loadCart();
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
      this.page,
      this.pageSize,
      this.selectedCategory ?? undefined,
      this.minPrice ?? undefined,
      this.maxPrice ?? undefined
    ).subscribe(({ products, totalItems }) => {
      this.products = products;
      this.totalItems = totalItems;
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, 1).subscribe();
  }

  updateQuantity(productId: number, event: Event): void {
    const quantity = parseInt((event.target as HTMLInputElement).value, 10);
    if (quantity > 0) {
      const cartItem = this.cart.items.find(item => item.productId === productId);
      if (cartItem) {
        this.cartService.updateQuantity(cartItem.id, quantity).subscribe();
      }
    }
  }

  removeFromCart(productId: number): void {
    const cartItem = this.cart.items.find(item => item.productId === productId);
    if (cartItem) {
      this.cartService.removeFromCart(cartItem.id).subscribe();
    }
  }
} 