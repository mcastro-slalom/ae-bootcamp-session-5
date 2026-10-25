# Copilot Instructions

## Project Context

- This is a full-stack TODO application with a React frontend and an Express backend, organized as an npm-workspaces monorepo.
- Focus on iterative, feedback-driven development: make small changes and use tests and runtime feedback to guide the next step.
- Current phase: backend stabilization and frontend feature completion.

## Documentation References

- [Project overview](../docs/project-overview.md): architecture, technology stack, and project structure.
- [Testing guidelines](../docs/testing-guidelines.md): test patterns, standards, and commands.
- [Workflow patterns](../docs/workflow-patterns.md): development, debugging, and validation workflows.

## Development Principles

- **Test-Driven Development:** Follow Red-Green-Refactor: write or identify a test, see it fail, implement the smallest change that passes, then refactor while keeping tests green.
- **Incremental Changes:** Make small, focused, testable modifications; avoid bundling unrelated work.
- **Systematic Debugging:** Treat test failures and runtime errors as evidence. Reproduce, isolate, hypothesize, test, and verify the cause.
- **Validation Before Commit:** Run relevant tests and lint checks; before committing, ensure all required tests pass and there are no lint errors.

## Testing Scope

Use unit tests, integration tests, UI end-to-end tests, and manual browser testing together. Fast unit and integration feedback supports development; browser automation and exploratory checks build confidence in complete user journeys.

- **Backend:** Jest for unit tests and Supertest for API integration tests.
- **Frontend:** React Testing Library for component unit and integration tests.
- **UI testing:** Playwright for automation of critical user journeys.
- **Manual browser testing:** Exploratory validation and visual checks.

### Testing Approach by Context

- **Backend API changes:** Write Jest/Supertest tests first, run them to observe the failure, then implement using RED-GREEN-REFACTOR.
- **Frontend component features:** Write React Testing Library tests first for component behavior, then implement using RED-GREEN-REFACTOR. Follow with manual browser testing of full UI flows.
- This is true TDD: test first, then write code to make the test pass. Keep Playwright UI test authoring and execution within the `test-engineer` workflow described below.

## Workflow Patterns

1. **TDD Workflow:** Write or fix tests → run and observe failure → implement → confirm pass → refactor.
2. **Code Quality Workflow:** Run lint → categorize issues → fix systematically → re-validate. Keep lint cleanup separate from a test-fixing task unless lint blocks the tests.
3. **Integration Workflow:** Identify the issue → reproduce and debug → test the fix → verify end-to-end.
4. **UI Testing Workflow:** Define critical journeys → create UI tests → run → debug and classify failures → validate coverage and stability.

## Agent Usage

- **`tdd-developer`:** Use for implementation and unit/integration TDD cycles. Do not create or run Playwright UI tests in this mode.
- **`code-reviewer`:** Use to address lint errors and improve code quality.
- **`test-engineer`:** Owns all Playwright UI test authoring and execution, failure triage, and test-isolation checks.

## Memory System

- **Persistent Memory:** This file contains foundational project principles and workflows.
- **Working Memory:** `.github/memory/` contains development discoveries, session summaries, and recurring patterns. See its [README](memory/README.md) for how to use the system.
- During active development, take notes in `.github/memory/scratch/working-notes.md`; scratch files are ignored by Git and are not committed.
- At the end of a session, summarize useful findings in `.github/memory/session-notes.md`, which is committed as a historical record.
- Document recurring, reusable code patterns in `.github/memory/patterns-discovered.md`, which is also committed.
- Consult relevant memory files when providing context-aware suggestions, especially before repeating an investigation or recommending a project pattern.

## Workflow Utilities

GitHub CLI commands are available to all modes:

- List open issues: `gh issue list --state open`
- View an issue: `gh issue view <issue-number>`
- View an issue with comments: `gh issue view <issue-number> --comments`
- The main exercise issue has `Exercise:` in its title; its steps are posted as comments.
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked.

## Git Workflow

- Use conventional commit messages such as `feat:`, `fix:`, `chore:`, and `docs:`.
- Use descriptive feature branches named `feature/<descriptive-name>`.
- Stage all changes before committing with `git add .`.
- Push to the correct branch with `git push origin <branch-name>`.
