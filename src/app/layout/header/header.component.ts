import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <h1 class="text-2xl font-bold text-gray-800">
              <a routerLink="/" class="hover:text-blue-600 transition-colors">
                Angular Ecommerce
              </a>
            </h1>
            <nav class="hidden md:flex space-x-6">
              <a 
                routerLink="/products" 
                class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Products
              </a>
            </nav>
          </div>
          
          <div class="flex items-center space-x-4">
            <a 
              routerLink="/cart" 
              class="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              
              @if (cartItemCount > 0) {
                <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ cartItemCount }}
                </span>
              }
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() cartItemCount = 0;
}
