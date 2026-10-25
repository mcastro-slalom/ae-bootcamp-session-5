---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
argument-hint: "Required step number, such as 5-0 or 5-1"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

Validate the specified exercise step against the current workspace. Use the GitHub CLI workflow utilities in `.github/copilot-instructions.md`.

Step number: ${input:step-number:Required step number, for example 5-0}

The step number is required. If it is missing or blank, ask the user for it and stop; do not infer it.

1. Use `gh issue list --state open` to find the main exercise issue (the project instructions identify it by `Exercise:` in its title). If you cannot identify exactly one issue, report the ambiguity and stop.
2. Retrieve the issue and comments with `gh issue view <issue-number> --comments`.
3. Search the issue content and comments for the exact heading `# Step <step-number>:`. If it is absent or ambiguous, report that and stop.
4. Extract that step's `Success Criteria` section only. Check each criterion against the current workspace using relevant files, diffs, and available test/build results. Run focused checks where needed and safe; do not assume a criterion is met without evidence.
5. Report each criterion as complete, incomplete, or unable to verify, with concise evidence. Give specific next actions for every incomplete or unverified criterion. Do not modify files or commit changes as part of validation.
