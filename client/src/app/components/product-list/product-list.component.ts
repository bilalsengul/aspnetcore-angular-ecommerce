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
      this.page,
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

  updateQuantity(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);
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