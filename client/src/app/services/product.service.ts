import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../models/product.model';
import { environment } from '../../environments/environment';

export interface ProductResponse {
  products: Product[];
  totalItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(
    page: number,
    pageSize: number,
    categoryId?: number | null,
    minPrice?: number | null,
    maxPrice?: number | null
  ): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('pageNumber', (page - 1).toString())  // Convert to 0-based index
      .set('pageSize', pageSize.toString());

    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (minPrice !== undefined && minPrice !== null) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<ProductResponse>(`${this.apiUrl}/products`, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getTotalCount(
    minPrice?: number,
    maxPrice?: number,
    categoryId?: number
  ): Observable<number> {
    let params = new HttpParams();

    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId.toString());
    }

    return this.http.get<number>(`${this.apiUrl}/products/count`, { params });
  }
} 