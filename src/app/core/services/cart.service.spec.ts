import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';
import { Product, CartItem } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  let mockStorageService: StorageService;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    description: 'Test Description',
    price: 29.99,
    image: 'test.jpg',
    category: 'Electronics'
  };

  beforeEach(() => {
    mockStorageService = {
      getCart: vi.fn(),
      saveCart: vi.fn(),
      clearCart: vi.fn()
    } as any;

    service = new CartService(mockStorageService);
  });

  describe('getCartItems', () => {
    it('should return readonly cart items signal', () => {
      const cartItems = service.getCartItems();
      expect(cartItems).toBeDefined();
      expect(Array.isArray(cartItems())).toBe(true);
    });
  });

  describe('getCartItemCount', () => {
    it('should return 0 for empty cart', () => {
      const count = service.getCartItemCount();
      expect(count).toBe(0);
    });

    it('should return total quantity of all items', () => {
      // Mock storage to return items
      const mockCart: CartItem[] = [
        { product: mockProduct, quantity: 2 },
        { product: { ...mockProduct, id: '2' }, quantity: 3 }
      ];
      vi.spyOn(mockStorageService, 'getCart').mockReturnValue(mockCart);
      
      // Create new service to load mocked data
      service = new CartService(mockStorageService);
      
      const count = service.getCartItemCount();
      expect(count).toBe(5);
    });
  });

  describe('getCartTotal', () => {
    it('should return 0 for empty cart', () => {
      const total = service.getCartTotal();
      expect(total).toBe(0);
    });

    it('should calculate total price of all items', () => {
      const mockCart: CartItem[] = [
        { product: mockProduct, quantity: 2 },
        { product: { ...mockProduct, id: '2', price: 10.00 }, quantity: 1 }
      ];
      vi.spyOn(mockStorageService, 'getCart').mockReturnValue(mockCart);
      
      service = new CartService(mockStorageService);
      
      const total = service.getCartTotal();
      expect(total).toBe(69.98); // (29.99 * 2) + 10.00
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      service.addToCart(mockProduct, 1);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(1);
      expect(cartItems()[0].product).toEqual(mockProduct);
      expect(cartItems()[0].quantity).toBe(1);
      expect(mockStorageService.saveCart).toHaveBeenCalled();
    });

    it('should increment quantity if item already exists', () => {
      // Add item first
      service.addToCart(mockProduct, 1);
      
      // Add same item again
      service.addToCart(mockProduct, 2);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(1);
      expect(cartItems()[0].quantity).toBe(3);
      expect(mockStorageService.saveCart).toHaveBeenCalledTimes(2);
    });

    it('should add multiple different items', () => {
      const product2 = { ...mockProduct, id: '2' };
      
      service.addToCart(mockProduct, 1);
      service.addToCart(product2, 2);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(2);
      expect(cartItems()[0].product.id).toBe('1');
      expect(cartItems()[1].product.id).toBe('2');
      expect(cartItems()[1].quantity).toBe(2);
    });
  });

  describe('updateItemQuantity', () => {
    beforeEach(() => {
      service.addToCart(mockProduct, 1);
    });

    it('should update item quantity', () => {
      service.updateItemQuantity('1', 5);
      
      const cartItems = service.getCartItems();
      expect(cartItems()[0].quantity).toBe(5);
      expect(mockStorageService.saveCart).toHaveBeenCalled();
    });

    it('should remove item when quantity is 0', () => {
      service.updateItemQuantity('1', 0);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(0);
      expect(mockStorageService.saveCart).toHaveBeenCalled();
    });

    it('should remove item when quantity is negative', () => {
      service.updateItemQuantity('1', -1);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(0);
    });

    it('should not update if item does not exist', () => {
      const originalItems = service.getCartItems()();
      service.updateItemQuantity('non-existent', 5);
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toEqual(originalItems);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(() => {
      service.addToCart(mockProduct, 1);
    });

    it('should remove item from cart', () => {
      service.removeFromCart('1');
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(0);
      expect(mockStorageService.saveCart).toHaveBeenCalled();
    });

    it('should not remove if item does not exist', () => {
      const originalItems = service.getCartItems()();
      service.removeFromCart('non-existent');
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toEqual(originalItems);
    });
  });

  describe('clearCart', () => {
    beforeEach(() => {
      service.addToCart(mockProduct, 1);
    });

    it('should clear all items from cart', () => {
      service.clearCart();
      
      const cartItems = service.getCartItems();
      expect(cartItems()).toHaveLength(0);
      expect(mockStorageService.clearCart).toHaveBeenCalled();
    });
  });
});
