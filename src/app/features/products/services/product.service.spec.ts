import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductService } from './product.service';
import { FakeApiService } from '../../../core/services/fake-api.service';
import { Product } from '../models/product.model';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let mockFakeApiService: Pick<FakeApiService, 'getProducts' | 'getProductById' | 'getProductsByCategory'>;

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones.',
      price: 299.99,
      image: 'https://picsum.photos/seed/headphones1/400/300',
      category: 'Electronics',
    },
    {
      id: '2',
      title: 'Running Shoes',
      description: 'Lightweight and comfortable running shoes.',
      price: 89.99,
      image: 'https://picsum.photos/seed/shoes1/400/300',
      category: 'Sports',
    },
  ];

  beforeEach(() => {
    mockFakeApiService = {
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
      getProductById: vi.fn().mockReturnValue(of(mockProducts[0])),
      getProductsByCategory: vi.fn().mockReturnValue(of([mockProducts[0]])),
    };

    service = new ProductService(mockFakeApiService as FakeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts()', () => {
    it('should delegate to FakeApiService.getProducts()', async () => {
      const result = await service.getProducts().toPromise();

      expect(mockFakeApiService.getProducts).toHaveBeenCalledOnce();
      expect(result).toEqual(mockProducts);
    });

    it('should return an observable of products', (done) => {
      service.getProducts().subscribe((products) => {
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBe(2);
        done();
      });
    });
  });

  describe('getProductById()', () => {
    it('should delegate to FakeApiService.getProductById() with the given id', async () => {
      const result = await service.getProductById('1').toPromise();

      expect(mockFakeApiService.getProductById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProducts[0]);
    });

    it('should return undefined for an unknown id', async () => {
      vi.spyOn(mockFakeApiService, 'getProductById').mockReturnValue(of(undefined));

      const result = await service.getProductById('unknown').toPromise();

      expect(mockFakeApiService.getProductById).toHaveBeenCalledWith('unknown');
      expect(result).toBeUndefined();
    });
  });

  describe('getProductsByCategory()', () => {
    it('should delegate to FakeApiService.getProductsByCategory() with the given category', async () => {
      const result = await service.getProductsByCategory('Electronics').toPromise();

      expect(mockFakeApiService.getProductsByCategory).toHaveBeenCalledWith('Electronics');
      expect(result).toEqual([mockProducts[0]]);
    });

    it('should return empty array for a non-existent category', async () => {
      vi.spyOn(mockFakeApiService, 'getProductsByCategory').mockReturnValue(of([]));

      const result = await service.getProductsByCategory('Unknown').toPromise();

      expect(result).toEqual([]);
    });
  });
});
