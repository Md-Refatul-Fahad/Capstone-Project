# Development Workflow

The project must follow **Test Driven Development (TDD)**.

---

# TDD Cycle

1 Start with a small functional requirement.

2 Create a unit test before writing implementation.

3 Implement the simplest code to pass the test.

4 Refactor the implementation.

5 Write tests for Angular components.

6 Repeat.

---

# Example Workflow

Feature: Product List

Step 1
Write service test.

Step 2
Implement service.

Step 3
Write component test.

Step 4
Implement UI.

Step 5
Refactor code.

---

# Feature Development Order

Phase 1

product list  
product details  
add to cart

Phase 2

cart page  
checkout

Phase 3

payment success

---

# Commit Strategy

Use small commits.

Example:

feat: product list page  
test: product service unit tests  
refactor: improve cart state logic

---

# Code Quality

Before completing each feature:

- run unit tests
- run e2e tests
- run lint
- review architecture