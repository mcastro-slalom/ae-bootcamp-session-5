# Development Memory

## Purpose

Use this directory to preserve useful patterns, decisions, and lessons discovered while developing the TODO application. Good notes reduce repeated investigation and give future contributors and AI assistants concrete project context.

## Two Types of Memory

- **Persistent instructions:** [`.github/copilot-instructions.md`](../copilot-instructions.md) contains foundational project context, principles, and workflows. It is committed and applies across development sessions.
- **Working memory:** This directory contains discoveries from actual work. It consists of completed-session summaries, accumulated code patterns, and temporary notes for the active session.

## Directory Structure

```text
.github/memory/
|-- README.md
|-- session-notes.md
|-- patterns-discovered.md
`-- scratch/
    |-- .gitignore
    `-- working-notes.md
```

- [`session-notes.md`](session-notes.md) records completed sessions. It is committed to Git as a historical summary.
- [`patterns-discovered.md`](patterns-discovered.md) accumulates reusable code patterns and lessons. It is committed to Git.
- [`scratch/working-notes.md`](scratch/working-notes.md) is for active work: hypotheses, observations, decisions, and next steps. The scratch directory ignores all files, so these notes are local and are not committed.

## When to Use Each File

### TDD

At the start of a task, record the failing test or behavior and the current hypothesis in `scratch/working-notes.md`. During Red-Green-Refactor, note the evidence that changed your understanding, the implementation decision, and the final test outcome. At the end, summarize durable findings in `session-notes.md`; move a reusable implementation or test lesson to `patterns-discovered.md`.

### Linting

Use working notes to track lint categories being addressed, relevant commands, and any project-specific decisions. Record recurring conventions or non-obvious lint resolutions in `patterns-discovered.md`. Routine lint fixes do not need a historical session entry unless they reveal a useful lesson or complete a meaningful work session.

### Debugging

Use working notes to capture reproduction steps, observations, hypotheses, checks, and the confirmed root cause. After resolving the issue, summarize the durable result in `session-notes.md`. If the resolution is reusable in other modules, document it as a pattern as well.

## End-of-Session Routine

1. Review `scratch/working-notes.md` and separate confirmed findings from guesses.
2. Add a concise completed-session summary to `session-notes.md`.
3. Add or update entries in `patterns-discovered.md` for lessons likely to recur.
4. Leave active notes in scratch only if work is continuing locally; scratch content is ephemeral and will not be shared through Git.

The example in `session-notes.md` is illustrative. Replace it with real summaries as work is completed.

## How AI Uses These Notes

The persistent instructions point AI assistants to this memory system. For context-aware work, the assistant should read the relevant session summaries and patterns before proposing changes, then use confirmed findings as project-specific evidence rather than treating examples or unverified hypotheses as facts. Active scratch notes can provide additional context in the current workspace, but they are not available to other contributors through Git. Keep notes concise, factual, and specific enough to guide a future decision.