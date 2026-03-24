# Angular AI Guardrails

This file defines strict guardrails that the AI must follow while generating code.

The purpose is to prevent bad architectural decisions and enforce clean, scalable Angular development.

---

# 1. Component Guardrails

Components must remain **thin UI layers**.

Components MUST NOT contain:

- business logic
- API calls
- complex data transformations
- state management logic

Components are responsible only for:

- rendering UI
- handling user interaction
- emitting events
- binding data

Bad example:
ngOnInit() {
this.http.get('/products').subscribe(...)
}


Correct pattern:
component
→ service
→ state


---

# 2. Service Responsibility Guardrails

Services should handle:

- API communication
- business logic
- data transformations

Services must return **Observables**.

Never return Promises unless absolutely required.

Example:
getProducts(): Observable<Product[]>

Services should be **stateless when possible**.

---

# 3. State Management Guardrails

Use **Angular Signals for UI state**.

Use **RxJS for async operations**.

Correct usage:
cartItems = signal<CartItem[]>([])

Derived state must use:
computed()

Bad example:
let total = 0
Correct example:

Signals must be mutated through **dedicated methods**.

Example:
addItem(product)
removeItem(id)

Never mutate signal arrays directly.

Bad example:
this.cartItems().push(product)


Correct:
this.cartItems.update(...)

---

# 4. RxJS Guardrails

Use RxJS only where async streams are needed.

Prefer these operators:

switchMap  
map  
catchError  
combineLatest  

Avoid nested subscriptions.

Bad example:
subscribe(() => {
subscribe(...)
})
Correct:
switchMap(...)

---

# 5. Folder Structure Guardrails

The AI must follow feature-based architecture.

Never place feature logic in shared or core.

Correct:
features/products
features/cart
features/checkout


Shared folder must only contain reusable UI.

---

# 6. Testing Guardrails

Every feature must include tests.

Minimum requirements:

Service tests  
State tests  
Component tests  

Testing stack:

Vitest  
Angular Testing Library  

Rules:

- test behavior, not implementation
- avoid testing private methods
- use mocks for API calls

---

# 7. UI Guardrails

Use Tailwind for styling.

Avoid:

- inline styles
- large CSS files
- duplicated UI

Create reusable components when needed.

Examples:
product-card
cart-item
button
card

---

# 8. Performance Guardrails

All components must use:
ChangeDetectionStrategy.OnPush
Lists must use:
trackBy

Prefer async pipe over manual subscriptions.

Avoid unnecessary re-rendering.

---

# 9. Routing Guardrails

Routing must be feature-based.

Example:
/products
/products/:id
/cart
/checkout
/order-success


Feature pages must live inside feature folders.

---

# 10. Fake API Guardrails

Fake APIs must simulate real backend behavior.

Example:
of(products).pipe(delay(300))

Never access JSON directly from components.

Always go through a service.

---

# 11. Cart Persistence Guardrails

Cart must persist using localStorage.

Cart loading should happen at application startup.

Encapsulate persistence logic inside cart state/service.

Components must not access localStorage.

---

# 12. Payment Simulation Guardrails

Payment logic must be implemented in a dedicated service.

Example:
payment.service.ts
Example method:
processPayment(): Observable<boolean>

Payment simulation should include delay to mimic real backend.

Example:
of(true).pipe(delay(500))

---

# 13. Code Quality Guardrails

Avoid:

- large components
- duplicated logic
- tight coupling
- magic values

Prefer:

- reusable utilities
- clear naming
- typed interfaces

---

# 14. TDD Guardrails

The AI must follow strict TDD flow.

Process:

1 Write failing test
2 Implement minimal code
3 Make test pass
4 Refactor safely

Do not implement large features without tests.

---

# 15. Backend Readiness Guardrail

The frontend must be designed so that fake APIs can be replaced with real APIs.

Example:

Replace:
FakeProductApiService

With:
HttpProductApiService

Without changing components.

This ensures maintainability.

---

# Final Principle

The AI should behave like a **senior Angular architect**.

Code must be:

- modular
- testable
- scalable
- maintainable