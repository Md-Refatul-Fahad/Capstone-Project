import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product, Order, CustomerInfo, CartItem } from '../models/product.model';
import productsData from '../../../assets/data/products.json';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private products: Product[] = productsData as Product[];

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(300));
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => p.category === category);
    return of(filteredProducts).pipe(delay(300));
  }

  createOrder(orderData: {
    items: CartItem[];
    total: number;
    customerInfo: CustomerInfo;
  }): Observable<Order> {
    const newOrder: Order = {
      ...orderData,
      id: this.generateOrderId(),
      orderDate: new Date()
    };
    return of(newOrder).pipe(delay(1000)); // Simulate payment processing
  }

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
