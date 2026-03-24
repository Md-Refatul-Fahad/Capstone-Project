# Angular Ecommerce Customer App Implementation Plan

This plan outlines the implementation of a modern Angular ecommerce customer application using Angular 21+, standalone components, clean architecture, and TDD principles with future .NET backend integration in mind.

## Project Setup & Foundation

### 1. Initialize Angular Project
- Create new Angular 21+ project with standalone components
- Configure TypeScript strict mode
- Set up Tailwind CSS for styling
- Install minimal Angular Material components
- Configure Vitest for unit testing with Angular Testing Library
- Set up Playwright for E2E testing

### 1.1. Testing Configuration
- Configure Vitest with Angular Testing Library
- Set up test environment for Angular components
- Configure mock service patterns
- Set up coverage reporting with Vitest

### 2. Project Structure
```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   │   ├── services/
│   │   │   ├── fake-api.service.ts
│   │   │   └── storage.service.ts
│   │   └── models/
│   │       └── product.model.ts
│   ├── shared/               # Reusable components
│   │   ├── components/
│   │   └── pipes/
│   ├── features/             # Feature modules
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   ├── cart/
│   │   └── checkout/
│   ├── layout/               # Layout components
│   └── store/                # State management
├── assets/
│   └── data/
│       └── products.json
└── tests/                    # Test utilities
```

## Phase 1: Product Browsing (TDD Approach)

### 3. Core Models & Services
- Create Product interface: id, title, description, price, image, category
- Implement FakeApiService with RxJS observables and simulated delays
- Create StorageService for localStorage operations
- Write unit tests for all services before implementation

### 4. Product Data
- Create `products.json` with 10-20 sample products
- Use picsum.photos for placeholder images with product IDs
- Include diverse categories and price ranges

### 5. Product Features (Test-First)
- **Product List Component**: Display grid of products with pagination
- **Product Card Component**: Reusable card for product preview (separate component)
- **Product Details Component**: Full product information view (separate component)
- **Routing**: Set up `/products` and `/products/:id` routes
- Each component will have unit tests written before implementation

## Phase 2: Shopping Flow

### 6. Cart Management
- **Cart Service**: Manage cart state using Angular Signals
- **Cart Page Component**: Display cart items with quantity controls
- **Cart Item Component**: Individual item with update/remove functionality
- **Storage Integration**: Persist cart in localStorage
- Add to cart functionality from product pages

### 7. Cart Features
- Quantity increment/decrement with validation
- Remove item from cart
- Calculate subtotal dynamically
- Cart item count indicator in header
- Empty cart state handling

## Phase 3: Checkout & Payment

### 8. Checkout Process
- **Checkout Page**: Order summary with customer form
- **Order Service**: Handle order creation logic
- **Payment Simulation**: Mock payment processing with success/failure states
- **Order Success Page**: Confirmation page with order details

### 9. Payment Flow
- Simple form validation (name, email, address)
- Mock payment API call with simulated processing time
- Success/error state handling
- Cart clearing on successful order
- Order confirmation display

## Architecture Principles

### 10. Clean Architecture Implementation
- **Dependency Inversion**: Fake API implements interface for easy .NET replacement
- **Single Responsibility**: Each service/component has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code
- **Feature-based organization**: Co-located functionality

### 11. State Management Strategy
- Angular Signals for UI state (loading, error states)
- RxJS for async data streams (API calls)
- Services for business logic
- Component state for local UI concerns

### 12. Testing Strategy
- **Unit Tests**: 80%+ coverage with Vitest + Angular Testing Library
- **Integration Tests**: Service interactions and data flow
- **E2E Tests**: Critical user journeys with Playwright
- Test-first development for all features

## Future Backend Integration

### 13. API Abstraction Layer
- Define clear interfaces for all API operations
- FakeApiService implements these interfaces
- Easy replacement with .NET API service later
- Environment-based service selection

### 14. Error Handling & Resilience
- Global error handling with interceptors
- Retry logic for failed requests
- User-friendly error messages
- Loading states for all async operations

## Implementation Order

1. **Week 1**: Project setup, core architecture, product models, fake API
2. **Week 2**: Phase 1 implementation (product browsing) with full TDD
3. **Week 3**: Phase 2 implementation (cart functionality) with tests
4. **Week 4**: Phase 3 implementation (checkout/payment) with tests
5. **Week 5**: Refinement, E2E tests, documentation, .NET integration prep

## Success Criteria

- All Phase 1-3 features working with fake data
- 80%+ unit test coverage
- All critical user journeys covered by E2E tests
- Clean, maintainable code following Angular best practices
- Easy backend integration path prepared
- Responsive design working on mobile and desktop
