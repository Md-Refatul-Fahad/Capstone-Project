import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = signal<CartItem[]>([]);

  constructor(private storageService: StorageService) {
    this.loadCart();
  }

  getCartItems() {
    return this.cart.asReadonly();
  }

  getCartItemCount() {
    return computed(() => {
      return this.cart().reduce((total, item) => total + item.quantity, 0);
    });
  }

  getCartTotal() {
    return computed(() => {
      return this.cart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cart();
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      // Update existing item quantity
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
      this.cart.set(updatedCart);
    } else {
      // Add new item
      const newCart = [...currentCart, { product, quantity }];
      this.cart.set(newCart);
    }
    
    this.saveCart();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cart();
    const updatedCart = currentCart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    this.cart.set(updatedCart);
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cart();
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cart.set(updatedCart);
    this.saveCart();
  }

  clearCart(): void {
    this.cart.set([]);
    this.storageService.clearCart();
  }

  private loadCart(): void {
    const savedCart = this.storageService.getCart();
    this.cart.set(savedCart);
  }

  private saveCart(): void {
    this.storageService.saveCart(this.cart());
  }
}
