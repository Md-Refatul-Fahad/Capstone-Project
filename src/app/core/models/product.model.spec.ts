import { describe, it, expect } from 'vitest';
import { Product, CartItem, Order, CustomerInfo } from './product.model';

describe('Product Models', () => {
  describe('Product Interface', () => {
    it('should create a valid product', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test Description',
        price: 29.99,
        image: 'test.jpg',
        category: 'Electronics'
      };

      expect(product.id).toBe('1');
      expect(product.title).toBe('Test Product');
      expect(product.description).toBe('Test Description');
      expect(product.price).toBe(29.99);
      expect(product.image).toBe('test.jpg');
      expect(product.category).toBe('Electronics');
    });
  });

  describe('CartItem Interface', () => {
    it('should create a valid cart item', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test Description',
        price: 29.99,
        image: 'test.jpg',
        category: 'Electronics'
      };

      const cartItem: CartItem = {
        product,
        quantity: 2
      };

      expect(cartItem.product).toEqual(product);
      expect(cartItem.quantity).toBe(2);
    });
  });

  describe('CustomerInfo Interface', () => {
    it('should create valid customer info', () => {
      const customerInfo: CustomerInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Test St'
      };

      expect(customerInfo.name).toBe('John Doe');
      expect(customerInfo.email).toBe('john@example.com');
      expect(customerInfo.address).toBe('123 Test St');
    });
  });

  describe('Order Interface', () => {
    it('should create a valid order', () => {
      const product: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test Description',
        price: 29.99,
        image: 'test.jpg',
        category: 'Electronics'
      };

      const cartItem: CartItem = {
        product,
        quantity: 2
      };

      const customerInfo: CustomerInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Test St'
      };

      const order: Order = {
        id: 'ORD-123',
        items: [cartItem],
        total: 59.98,
        customerInfo,
        orderDate: new Date()
      };

      expect(order.id).toBe('ORD-123');
      expect(order.items).toHaveLength(1);
      expect(order.total).toBe(59.98);
      expect(order.customerInfo).toEqual(customerInfo);
      expect(order.orderDate).toBeInstanceOf(Date);
    });
  });
});
