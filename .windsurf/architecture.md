# Angular Ecommerce Architecture Guide

This document defines the architectural patterns the AI must follow when implementing the project.

The goal is to create a **clean, scalable, and testable Angular application**.

---

# High Level Architecture

The application follows **layered frontend architecture**.

Layers:

UI Layer
State Layer
Service Layer
Data Layer

Structure:

UI Components
↓
Feature State (Signals)
↓
Services
↓
Fake API / Backend API

---

# Feature-Based Architecture

Each feature should be isolated.

Example:

features/products
products
components
pages
services
models

Example:

features/cart
cart
components
pages
services
state
models

This makes features easy to maintain and scale.

---

# Smart vs Presentational Components

Follow this pattern strictly.

---

## Smart Components (Container)

Responsibilities:

- fetch data
- interact with services
- manage state
- handle navigation

Example:
product-list.page.ts
cart.page.ts
checkout.page.ts

These components **know about services**.

---

## Presentational Components (UI)

Responsibilities:

- render UI
- emit events
- receive inputs

Example:
product-card.component
cart-item.component


Rules:

Presentational components must **not call services directly**.

They should use:
@Input()
@Output()
Example:
addToCart.emit(product)


---

# Signals Store Pattern

Use Angular Signals to manage local state.

Example:

Cart State
cartItems = signal<CartItem[]>([])

totalPrice = computed(() =>
this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
)

Rules:

Signals store must:

- manage UI state
- expose readonly signals
- hide mutation logic

Example:
addItem(product)
removeItem(id)
updateQuantity(id, qty)

---

# Fake Backend Adapter Pattern

The system should simulate backend calls.

Create a **fake API adapter** that mimics real API responses.

Example:
product-api.service.ts

Example:
getProducts(): Observable<Product[]>
getProductById(id: string): Observable<Product>

Implementation:
of(products).pipe(delay(300))

Later this service can be replaced with real backend calls.

---

# Data Model Layer

Models must be defined separately.

Example:
features/products/models/product.model.ts

Example model:
export interface Product {
id: string
title: string
description: string
price: number
image: string
category: string
}

---

# Shared UI Components

Reusable components go into shared folder.

Example:
shared/components

Possible shared components:
button
card
modal
loading-spinner

Shared components must be:

- stateless
- reusable
- presentational

---

# Routing Strategy

Use feature-based routing.

Example:
/products
/products/:id
/cart
/checkout
/order-success

Feature pages should live inside the feature folder.

Example:
features/products/pages/product-list.page.ts

---

# Cart Persistence Strategy

Cart state must persist in localStorage.

Strategy:

When cart changes:
saveCartToLocalStorage()
On app load:
loadCartFromLocalStorage()

Cart logic must be handled inside **CartService or CartState**.

---

# Payment Simulation

Payment is mocked.

Flow:

Checkout page
↓
Click Pay
↓
Fake payment service
↓
delay(500)
↓
clear cart
↓
navigate to success page

Example service:
payment.service.ts
Example method:
processPayment(): Observable<boolean>
Implementation:
return of(true).pipe(delay(500))

---

# Testing Strategy

Testing must follow TDD.

Order:

1 Service tests
2 State tests
3 Component tests
4 E2E tests

---

## Service Testing

Test:

- data retrieval
- error handling

Example:
product-api.service.spec.ts

---

## State Testing

Test:

- cart logic
- computed values

Example:
cart.state.spec.ts

---

## Component Testing

Use Angular Testing Library.

Test:

- rendering
- user interaction
- event emission

Example:
product-card.component.spec.ts

---

## E2E Testing

Use Playwright.

Test real user flow:

1 Open product list
2 Open product detail
3 Add to cart
4 Open cart
5 Checkout
6 Payment success

---

# Performance Guidelines

Use:

OnPush change detection

Use:
trackBy

Avoid:

manual subscriptions when async pipe works.

Lazy load features when possible.

---

# Code Quality Guidelines

Every feature must include:

component
service
model
tests

Avoid:

- large components
- duplicated logic
- tight coupling

Prefer:

small reusable services.

---

# Future Backend Integration

The system must be backend-ready.

Fake API layer must be replaceable.

Example:

Replace
FakeProductApiService

With
HttpProductApiService

Without changing UI components.

This ensures **clean separation of concerns**.