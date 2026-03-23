import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageService } from './storage.service';
import { CartItem } from '../models/product.model';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getCart', () => {
    it('should return empty array when no cart is stored', () => {
      const cart = service.getCart();
      expect(cart).toEqual([]);
    });

    it('should return stored cart items', () => {
      const mockCart: CartItem[] = [
        {
          product: {
            id: '1',
            title: 'Test Product',
            description: 'Test Description',
            price: 29.99,
            image: 'test.jpg',
            category: 'Electronics'
          },
          quantity: 2
        }
      ];

      localStorage.setItem('shopping-cart', JSON.stringify(mockCart));
      const cart = service.getCart();

      expect(cart).toEqual(mockCart);
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('shopping-cart', 'invalid-json');
      
      expect(() => {
        const cart = service.getCart();
        expect(cart).toEqual([]);
      }).not.toThrow();
    });
  });

  describe('saveCart', () => {
    it('should save cart to localStorage', () => {
      const mockCart: CartItem[] = [
        {
          product: {
            id: '1',
            title: 'Test Product',
            description: 'Test Description',
            price: 29.99,
            image: 'test.jpg',
            category: 'Electronics'
          },
          quantity: 2
        }
      ];

      service.saveCart(mockCart);

      const storedCart = localStorage.getItem('shopping-cart');
      expect(storedCart).toBe(JSON.stringify(mockCart));
    });

    it('should overwrite existing cart', () => {
      const initialCart: CartItem[] = [
        {
          product: {
            id: '1',
            title: 'Test Product',
            description: 'Test Description',
            price: 29.99,
            image: 'test.jpg',
            category: 'Electronics'
          },
          quantity: 2
        }
      ];

      const updatedCart: CartItem[] = [
        {
          product: {
            id: '2',
            title: 'Updated Product',
            description: 'Updated Description',
            price: 39.99,
            image: 'updated.jpg',
            category: 'Sports'
          },
          quantity: 1
        }
      ];

      // Save initial cart
      localStorage.setItem('shopping-cart', JSON.stringify(initialCart));
      
      // Save updated cart
      service.saveCart(updatedCart);

      const storedCart = localStorage.getItem('shopping-cart');
      expect(storedCart).toBe(JSON.stringify(updatedCart));
    });
  });

  describe('clearCart', () => {
    it('should remove cart from localStorage', () => {
      const mockCart: CartItem[] = [
        {
          product: {
            id: '1',
            title: 'Test Product',
            description: 'Test Description',
            price: 29.99,
            image: 'test.jpg',
            category: 'Electronics'
          },
          quantity: 2
        }
      ];

      localStorage.setItem('shopping-cart', JSON.stringify(mockCart));
      service.clearCart();

      const storedCart = localStorage.getItem('shopping-cart');
      expect(storedCart).toBeNull();
    });

    it('should not throw error when clearing empty localStorage', () => {
      expect(() => {
        service.clearCart();
      }).not.toThrow();
    });
  });
});
