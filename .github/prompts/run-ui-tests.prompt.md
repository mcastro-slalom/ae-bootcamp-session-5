---
description: "Run UI tests and summarize failures"
agent: "test-engineer"
tools: ['read', 'execute', 'todo']
---

Run the repository's Playwright UI tests and summarize the results. Do not edit application or test files as part of this prompt.

1. **First action:** Run `npm run test:ui:install --workspace=frontend` before starting or running UI tests. Repeat this after a container rebuild.
2. On Ubuntu/Linux, this installation is mandatory and must perform `playwright install --with-deps chromium`. The project `test:ui:install` script includes bounded automatic Ubuntu repository remediation for the common Yarn key issue and one retry. Use that script; do not perform ad-hoc package hunting or broad OS troubleshooting.
3. If the installation fails, stop immediately. Report the failing command and key error lines as an environment blocker. Do not start services or run Playwright tests after a failed install.
4. After successful installation, ensure both backend and frontend are running. Check the current environment first; if either is not running, start the application from the repository root with `npm start` as needed. Do not start duplicate services when they are already available.
5. Run the project UI test command from the repository root: `npm run test:ui`.
6. Summarize the overall pass/fail result and the test command. For failures, include the relevant failing test names and classify likely causes as application code, test code, or environment, distinguishing evidence from hypotheses.
