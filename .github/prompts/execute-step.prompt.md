---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
argument-hint: "Optional issue number"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

Execute the latest applicable exercise step from the GitHub issue. The project instructions in `.github/copilot-instructions.md` provide the GitHub CLI workflow utilities and testing scope.

Issue number: ${input:issue-number:Optional issue number; leave blank to find the exercise issue}

1. If an issue number was provided, use it. Otherwise, use `gh issue list --state open` and identify the exercise issue by its title (the project instructions note that its title contains `Exercise:`). If you cannot identify exactly one appropriate issue, stop and report what is ambiguous.
2. Retrieve the issue and its comments with `gh issue view <issue-number> --comments`.
3. Find the latest step instructions in the issue and extract its `:keyboard: Activity:` sections and step number. If the latest step is ambiguous or missing, report that rather than guessing.
4. Execute each activity systematically, respecting the testing scope constraints in `.github/copilot-instructions.md` and the applicable TDD workflow. Explain relevant findings and run appropriate checks.
5. **Do not create or run Playwright UI tests in this prompt.** If the step requires UI testing, hand off that work to `/create-ui-tests` and `/run-ui-tests`, which switch to `test-engineer`.
6. Do not commit or push changes. That is the job of `/commit-and-push`.
7. Stop after completing the activities. Report the step number, work completed, checks and results, and the next command(s), in this order:
   - If the step requires UI workflow: `/create-ui-tests` → `/run-ui-tests` → `/validate-step <step-number>`.
   - If no UI workflow is required: `/validate-step <step-number>`.

Never recommend `/validate-step` before any required UI prompts.
