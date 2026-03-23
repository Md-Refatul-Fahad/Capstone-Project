# Angular Development Rules

## General Rules

Use Angular best practices.

Always use latest Angular APIs.

Prefer standalone components.

Use TypeScript strict mode.

Follow SOLID principles.

Write clean and reusable code.

---

# Component Rules

Components must be small and focused.

Follow smart vs presentational component pattern.

Avoid business logic inside components.

Move logic to services.

Use OnPush change detection.

---

# Service Rules

All API calls must be inside services.

Use Angular HttpClient or simulated API services.

Use RxJS operators when needed:

switchMap
map
catchError

Services must be testable.

---

# State Management Rules

Use Angular Signals for UI state.

Use RxJS Observables for async operations.

Cart state must persist in localStorage.

---

# Folder Structure Rules

Follow feature-based architecture.
src/app
core
shared
features


Each feature must contain:
components
pages
services
models
state


---

# Testing Rules

Use:

Vitest
Angular Testing Library

Rules:

Every service must have unit tests.

Test business logic first.

Use mock APIs instead of real APIs.

Follow TDD whenever possible.

---

# Performance Rules

Use OnPush change detection.

Avoid unnecessary subscriptions.

Prefer async pipe.

Use trackBy in lists.

Lazy load feature routes.

---

# UI Rules

Use Tailwind CSS.

Avoid inline styles.

Keep UI components reusable.

Angular Material should be minimal.

---

# Security Rules

Sanitize user inputs.

Avoid direct DOM manipulation.

Use Angular built-in XSS protections.