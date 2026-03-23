import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeApiService } from '../../../core/services/fake-api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private fakeApiService: FakeApiService) {}

  getProducts(): Observable<Product[]> {
    return this.fakeApiService.getProducts();
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.fakeApiService.getProductById(id);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.fakeApiService.getProductsByCategory(category);
  }
}
