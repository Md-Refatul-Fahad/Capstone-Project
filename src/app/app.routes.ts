import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  // {
  //   path: 'products/:id',
  //   loadComponent: () => import('./features/products/pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  // },
  // {
  //   path: 'cart',
  //   loadComponent: () => import('./features/cart/pages/cart/cart.component').then(m => m.CartComponent)
  // },
  // {
  //   path: 'checkout',
  //   loadComponent: () => import('./features/checkout/pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  // },
  // {
  //   path: 'order-success',
  //   loadComponent: () => import('./features/checkout/pages/order-success/order-success.component').then(m => m.OrderSuccessComponent)
  // }
];
