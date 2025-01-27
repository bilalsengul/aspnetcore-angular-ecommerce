import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from '../models/product.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

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
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    if (minPrice) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice) {
      params = params.set('maxPrice', maxPrice.toString());
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params }).pipe(
      map(products => ({
        products,
        totalItems: products.length
      }))
    );
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