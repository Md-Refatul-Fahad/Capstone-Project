import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FakeApiService } from './fake-api.service';
import { Product, Order, CustomerInfo } from '../models/product.model';

describe('FakeApiService', () => {
  let service: FakeApiService;

  beforeEach(() => {
    service = new FakeApiService();
  });

  describe('getProducts', () => {
    it('should return an array of products with delay', async () => {
      const products = await service.getProducts().toPromise();
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products!.length).toBeGreaterThan(0);
      
      const firstProduct = products![0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('title');
      expect(firstProduct).toHaveProperty('description');
      expect(firstProduct).toHaveProperty('price');
      expect(firstProduct).toHaveProperty('image');
      expect(firstProduct).toHaveProperty('category');
    });

    it('should simulate network delay', async () => {
      const startTime = Date.now();
      await service.getProducts().toPromise();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(250); // At least 250ms delay
    });
  });

  describe('getProductById', () => {
    it('should return a product when valid ID is provided', async () => {
      const product = await service.getProductById('1').toPromise();
      
      expect(product).toBeDefined();
      expect(product!.id).toBe('1');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });

    it('should return undefined when invalid ID is provided', async () => {
      const product = await service.getProductById('invalid-id').toPromise();
      
      expect(product).toBeUndefined();
    });

    it('should simulate network delay', async () => {
      const startTime = Date.now();
      await service.getProductById('1').toPromise();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(150); // At least 150ms delay
    });
  });

  describe('getProductsByCategory', () => {
    it('should return filtered products by category', async () => {
      const electronics = await service.getProductsByCategory('Electronics').toPromise();
      
      expect(electronics).toBeDefined();
      expect(Array.isArray(electronics)).toBe(true);
      
      electronics!.forEach(product => {
        expect(product.category).toBe('Electronics');
      });
    });

    it('should return empty array for non-existent category', async () => {
      const products = await service.getProductsByCategory('NonExistent').toPromise();
      
      expect(products).toEqual([]);
    });
  });

  describe('createOrder', () => {
    it('should create an order with generated ID and date', async () => {
      const customerInfo: CustomerInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Test St'
      };

      const orderData = {
        items: [],
        total: 0,
        customerInfo
      };

      const order = await service.createOrder(orderData).toPromise();
      
      expect(order).toBeDefined();
      expect(order!.id).toMatch(/^ORD-[A-Z0-9]+$/); // ORD- followed by alphanumeric
      expect(order!.orderDate).toBeInstanceOf(Date);
      expect(order!.customerInfo).toEqual(customerInfo);
      expect(order!.total).toBe(0);
      expect(order!.items).toEqual([]);
    });

    it('should simulate payment processing delay', async () => {
      const orderData = {
        items: [],
        total: 0,
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Test St'
        }
      };

      const startTime = Date.now();
      await service.createOrder(orderData).toPromise();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(950); // At least 950ms delay
    });
  });
});
