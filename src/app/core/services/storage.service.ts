import { Injectable } from '@angular/core';
import { CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly CART_KEY = 'shopping-cart';

  getCart(): CartItem[] {
    try {
      const cartData = localStorage.getItem(this.CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
      return [];
    }
  }

  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  clearCart(): void {
    try {
      localStorage.removeItem(this.CART_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  }
}
