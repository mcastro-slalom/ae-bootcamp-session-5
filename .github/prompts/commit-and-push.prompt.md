---
description: "Analyze changes, generate a commit message, and push to a feature branch"
argument-hint: "Required feature branch name"
tools: ['read', 'execute', 'todo']
---

Analyze the current changes, commit them, and push to the user-specified feature branch. Use the Git workflow in `.github/copilot-instructions.md` for repository conventions.

Branch name: ${input:branch-name:Required feature branch name}

1. If no branch name is provided, ask the user for one and stop until they provide it. Never substitute a branch name.
2. Refuse to proceed if the specified branch is `main` or `master`. Never commit or push to those branches or to any branch other than the exact user-provided branch.
3. Check whether the current step requires UI workflow. If it does, require either a successful `/run-ui-tests` result in the current chat or run `npm run test:ui` and confirm it succeeds before committing. Do not proceed with a commit if required UI validation has not passed.
4. Analyze all changes using `git status` and `git diff`, including staged and unstaged changes. Summarize the change and generate a descriptive conventional commit message (`feat:`, `fix:`, `chore:`, `docs:`, etc.). Do not include unrelated or sensitive content; if the diff includes unexpected changes, stop and ask before staging.
5. Check whether the exact specified branch exists. If it does, switch to it with `git checkout <branch-name>`; otherwise create it with `git checkout -b <branch-name>`. Verify the active branch is exactly the specified branch and is not `main` or `master` before proceeding.
6. Stage all changes with `git add .`, then inspect the staged diff and status to confirm the staged content is expected. If unexpected content is staged, stop without committing and ask the user how to proceed.
7. Commit with the generated message and include the repository-required co-author trailer:
   `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`
8. Push only to `origin <branch-name>`. Report the commit hash, branch, push result, and validation performed. Do not amend existing commits.
