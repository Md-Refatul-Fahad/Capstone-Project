# Angular Ecommerce Customer App - Business Context

## Project Overview
Building a modern ecommerce customer web application using Angular 21+ with clean architecture, TDD, and scalable frontend design. The application will initially use a fake API service and later integrate with a .NET backend.

## Business Requirements

### Core Business Goals
- Provide customers with an intuitive shopping experience
- Support product discovery and browsing
- Enable seamless cart management and checkout
- Prepare for future backend integration with minimal changes
- Maintain high code quality and testability

### Target Users
- Online shoppers looking for simple, fast ecommerce experience
- No user authentication required for initial phases
- Focus on guest checkout experience

## Technical Constraints & Decisions

### Technology Stack
- **Frontend**: Angular 21+ with standalone components
- **TypeScript**: Strict mode enabled
- **State Management**: Angular Signals for UI state, RxJS for async streams
- **Testing**: Jest for unit tests, Playwright for E2E
- **Styling**: Tailwind CSS with minimal Angular Material
- **Data Layer**: Fake API service with in-memory JSON data
- **Persistence**: Cart stored in localStorage

### Architecture Principles
- Clean architecture with clear separation of concerns
- Feature-based folder structure
- Dependency inversion for easy backend replacement
- Test-driven development approach
- Component granularity: separate components for product card, list, and details

## Business Rules

### Product Management
- Products have: id, title, description, price, image, category
- 10-20 sample products for realistic testing
- Images use placeholder URLs (picsum.photos)
- Products are browsable without authentication

### Shopping Cart Rules
- Cart persists in localStorage
- Quantity can be updated with validation
- Items can be removed from cart
- Cart calculates subtotal dynamically
- Cart shows item count indicator

### Checkout Process
- Mock payment simulation (no real payment integration)
- Customer form validation required
- Success/failure states handled appropriately
- Cart cleared on successful order
- Order confirmation displayed

## Data Requirements

### Product Data Structure
```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
```

### Data Sources
- `assets/data/products.json` - Product catalog
- Fake API service simulates network delays (300ms)
- Observable-based data streams with RxJS

## User Experience Requirements

### Navigation Flow
1. Product List (`/products`)
2. Product Details (`/products/:id`)
3. Cart Management (`/cart`)
4. Checkout (`/checkout`)
5. Order Success (`/order-success`)

### Responsive Design
- Mobile-first approach
- Desktop and tablet compatibility
- Accessible UI components
- Fast loading times

## Future Business Considerations

### Planned Extensions
- User registration and authentication
- Order history
- Real payment integration
- Backend microservices (.NET)
- Advanced search and filtering

### Scalability Requirements
- Modular architecture for easy feature addition
- API abstraction layer for backend flexibility
- Component reusability across features
- Performance optimization for larger catalogs

## Quality Standards

### Code Quality
- TypeScript strict mode
- Comprehensive unit testing (80%+ coverage)
- E2E testing for critical user journeys
- Clean code principles
- Consistent coding standards

### Performance
- Lazy loading for routes
- Optimized bundle sizes
- Efficient state management
- Smooth user interactions

## Success Metrics
- All Phase 1-3 features functional
- High test coverage achieved
- Clean, maintainable codebase
- Easy backend integration path
- Positive user experience on all devices
