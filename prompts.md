# Prompt library

Reusable prompts for driving the coding agent. Replace the `<...>` placeholders. Every prompt assumes the agent has read [AGENTS.md](AGENTS.md).

## New feature

```
Context: <where this fits in the app, which files are involved>
Goal: <the user-visible behaviour to add>
Constraints: follow AGENTS.md; no new dependencies; state stays in App; keep the change scoped to this feature.
Acceptance criteria:
- <criterion 1, phrased so a test can check it>
- <criterion 2>
Examples: <input -> expected output / UI state>
First reply with a plan (files to touch, tests to add). Do not write code until I approve the plan.
```

## Bug fix

```
Bug: <what happens>
Expected: <what should happen>
Steps to reproduce: <1, 2, 3>
First write a test that fails because of this bug and show me it failing. Then fix the code with the smallest change that makes it pass. Do not change unrelated code or existing tests.
```

## Refactor

```
Refactor <file/area> to <goal, e.g. extract X into its own component>.
Behaviour must not change: all existing tests must pass without being edited.
No new dependencies. List the files you will touch before you start.
```

## Generate tests

```
Write Vitest + React Testing Library tests for <feature/file>.
Cover: <happy path, edge cases, invalid input>.
Query by label/role (or data-cy for Cypress), not by CSS class.
Each test must fail if <feature> is broken. For each test, say which code change would make it fail.
Do not modify application code.
```

## Review diff

```
Review the current `git diff` against these questions:
- Does it run (lint, tests, build)?
- Does it match the request: <paste the request>?
- Anything outside the requested scope?
- Missing tests or edge cases?
- Does it follow AGENTS.md (state in App, one component per file, data-cy selectors, no new deps)?
List problems by severity. Do not change any files.
```

## Commit message

```
Write a commit message for the staged changes.
Format: Conventional Commits, `<type>(<scope>): <summary>` in the imperative, max 72 chars,
then a blank line and a short body explaining what changed and why.
Types: feat, fix, refactor, test, docs, chore.
```

## Feature prompt: add expense

**Context.** A Vite + React app with no features yet. `App.jsx` will own the expense list in state. Shared logic belongs in `src/utils/expenses.js`, and the form goes in `src/components/ExpenseForm.jsx`. Follow AGENTS.md.

**Goal.** Let the user add an expense with a title, an amount and a category (Food, Travel, Bills, Other). Valid expenses are added to the list in `App`, and invalid ones are rejected with a message.

**Constraints.**
- No new dependencies.
- The expense list lives in `App`. `ExpenseForm` only holds its input values and error message, and reports a valid expense through an `onAdd` prop.
- Put validation in a pure `validateExpense({ title, amount })` function in `src/utils/expenses.js` that returns an error message or `null`.
- Add `data-cy` attributes: `title`, `amount`, `category`, `add-expense`, `form-error`.
- Only touch `App.jsx`, `ExpenseForm.jsx`, `utils/expenses.js` and their tests.

**Acceptance criteria.** Each one maps to a test.
1. Submitting title "Lunch", amount "250", category "Food" calls `onAdd` with `{ title: 'Lunch', amount: 250, category: 'Food' }`.
2. After a successful add, the title and amount inputs are empty.
3. Leading and trailing spaces in the title are trimmed before saving.
4. An empty or whitespace-only title does not call `onAdd` and shows "Title is required."
5. A non-numeric amount ("abc", "12abc") or empty amount does not call `onAdd` and shows "Amount must be a number."
6. An amount of 0 or less does not call `onAdd` and shows "Amount must be greater than zero."
7. The category dropdown offers exactly Food, Travel, Bills, Other, and defaults to Food.
8. Once added, the expense appears as a new row in the list rendered by `App`.

**Examples.**

| Title | Amount | Category | Result |
| --- | --- | --- | --- |
| `Lunch` | `250` | Food | added: `{ title: 'Lunch', amount: 250, category: 'Food' }` |
| `  Cab ` | `400.5` | Travel | added: `{ title: 'Cab', amount: 400.5, category: 'Travel' }` |
| (empty) | `250` | Food | rejected: "Title is required." |
| `Lunch` | `abc` | Food | rejected: "Amount must be a number." |
| `Refund` | `-50` | Other | rejected: "Amount must be greater than zero." |
