# Expense Tracker

A small React app for tracking expenses, built with Vite.

- Add an expense with a title, amount and category (Food, Travel, Bills, Other).
- Invalid input is rejected: empty title, non-numeric amount, zero/negative amount, or more than 1,00,000.
- The list shows how many expenses are displayed and their total, formatted to 2 decimal places.
- Filter by category and delete expenses.

Expenses are kept in memory only, so a page reload clears them.

## Quick start

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Then open http://localhost:5173.

The full list of commands (unit tests, coverage, Cypress) and the project conventions are in [AGENTS.md](AGENTS.md). Prompt templates used to drive the coding agent are in [prompts.md](prompts.md).
