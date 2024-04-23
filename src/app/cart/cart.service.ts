import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl + '/cart';
  private readonly httpClient = inject(HttpClient);

  addProductToCart(product: Product) {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  clearCart(): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl);
  }

  getCartItems() {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  checkOut(products: Product[]): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + '/checkout', products);
  }
}
