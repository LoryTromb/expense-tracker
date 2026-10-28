# AGENTS.md

Guidance for coding agents (Codex, Claude Code, ...) working in this repo.

## Stack

- React 19 + Vite 8, plain JavaScript (JSX), no TypeScript.
- Lint: oxlint (`.oxlintrc.json`).
- Unit and component tests: Vitest + React Testing Library + jsdom, configured in the `test` block of `vite.config.js`.
- End-to-end tests: Cypress (`cypress.config.js`).

## Folder layout

```
src/
  App.jsx                 owns all state: the expense list and the active filter
  components/             one component per file (ExpenseForm, ExpenseList, ExpenseItem, CategoryFilter)
  utils/expenses.js       pure logic: validation, total, formatting, filtering, constants
  *.test.js(x)            Vitest tests, next to the file they test
  setupTests.js           loads jest-dom matchers
cypress/
  e2e/*.cy.js             end-to-end specs
  support/e2e.js          custom commands (cy.addExpense)
```

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Dev server | `npm run dev` (http://localhost:5173) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Unit/component tests (watch) | `npm test` |
| Unit/component tests (once) | `npx vitest run` |
| Coverage | `npm run test:coverage` |
| Cypress, interactive | `npm run cy:open` |
| Cypress, headless | `npm run cy:run` |

Cypress needs the dev server already running (`npm run dev` in another terminal).

Gotchas:

- Cypress expects the app on port 5173. If another app holds that port, Cypress silently tests the wrong page. Start Vite on a free port and override the URL: `npm run dev -- --port 5174` and `npx cypress run --config baseUrl=http://localhost:5174`.
- If Cypress fails with `bad option: --smoke-test`, the shell has `ELECTRON_RUN_AS_NODE=1` set (VS Code extensions set it for child processes). Unset it before running Cypress.

## Conventions

- One component per file, named after the component, in `src/components/`.
- App data (the expense list, the active filter) lives in `App` and is passed down as props and callbacks. Components may only keep transient UI state, such as the form's input values and error message.
- Each component starts with a short comment describing its props and state.
- Business rules go in `src/utils/expenses.js` as pure functions and get unit tests there. Components call them rather than re-implementing them.
- Every element that tests interact with has a `data-cy` attribute. Cypress selects by `data-cy` only, never by CSS class.
- Code style follows the existing files: single quotes, no semicolons, 2-space indent.

## Rules

- Do not add dependencies without asking first.
- Work on a branch, never commit directly to `main`. `main` is protected and needs one approval.
- Keep each task scoped to one feature or fix, with tests for it.
- Do not edit an existing test to make it pass unless the task says the behaviour changed.
- Before finishing, run `npm run lint` and `npx vitest run`, and summarise the change for the PR description: what changed, why, and how it was tested.
