# Patterns Discovered

Record reusable patterns confirmed in this codebase. Add new entries over time; prefer a concrete example and links to the implementation or tests that establish the pattern.

## Pattern Template

### [Pattern name]

- **Context:** [Where and when this pattern applies]
- **Problem:** [The issue or risk the pattern addresses]
- **Solution:** [The recommended approach and any relevant tradeoffs]
- **Example:**

  ```javascript
  // Add a concise, representative example.
  ```

- **Related files:** [Link to relevant implementation and test files]

## Service Initialization: Empty Array vs. Null

- **Context:** A service owns a collection, such as the in-memory TODO list, and consumers expect array operations.
- **Problem:** Initializing the collection to `null` makes a valid empty state indistinguishable from an uninitialized or unavailable state. Consumers calling array methods can fail.
- **Solution:** Initialize a collection to `[]` when it is ready to use and contains no entries. If initialization or loading is a separate state, represent that state explicitly instead of overloading `null` without a clear contract.
- **Example:**

  ```javascript
  const todos = [];
  ```

- **Related files:** [Backend app](../../packages/backend/src/app.js), [backend API tests](../../packages/backend/__tests__/app.test.js)