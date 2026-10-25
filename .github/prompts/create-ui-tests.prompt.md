---
description: "Create UI tests for required critical user journeys"
agent: "test-engineer"
argument-hint: "Optional user journeys; defaults to create, edit, toggle, delete, and core error states"
tools: ['search', 'read', 'edit', 'execute', 'todo']
---

Create or update focused Playwright tests for critical user journeys in this repository.

Journeys: ${input:journeys:Optional journeys; leave blank for the defaults}

1. If journeys are provided, use those. Otherwise cover the default set: create, edit, toggle, delete, and core error-state handling.
2. Inspect the existing Playwright framework, test conventions, and page objects before editing.
3. Target 3–5 Playwright test cases total for this run, with at least one error-path test. **Hard limit: create or update no more than five test cases.**
4. If more than five scenarios are candidates, choose the five highest-risk scenarios, including an error path, and list the deferred scenarios in the final report.
5. Prefer stable, accessibility-oriented selectors and state-based waits. Avoid brittle CSS selectors and fixed sleeps.
6. Apply Page Object Model: put reusable page interactions and selectors in page objects; keep test cases focused on scenario setup, actions, and assertions.
7. Before finishing, inspect the diff and verify the number of created or updated Playwright `test(...)` / `it(...)` cases is no more than five and includes at least one error path. Reduce the authored cases if necessary. Do not claim the scope was small if the final count exceeds five.
8. Report files changed, each scenario covered, the verified case count, and any deferred scenarios. Do not claim the tests pass unless you ran them.
