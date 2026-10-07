# Contributing to NU CCIT Capstone Starter

Thanks for helping build this capstone project! This guide keeps the team working consistently.

## Ground rules

- Keep PRs small and focused — one feature or fix per branch.
- Never commit `.env` files, secrets, or API keys.
- Don't push directly to `main`. All changes go through pull requests.
- Run lint and tests before every push.
- Be respectful in code reviews. We're all learning.

## Getting set up

1. Clone the repository

   git clone https://github.com/Ian-nwb/NU-CCIT-Capstone-Starter.git
   cd NU-CCIT-Capstone-Starter

2. Install dependencies

   bun install        # or: npm install

3. Start the infrastructure

   cd infra
   docker compose up -d

4. Follow the README for backend, frontend, and mobile setup.

## Branch naming

| Type       | Prefix        | Example                        |
| ---------- | ------------- | ------------------------------ |
| Feature    | `feature/`    | `feature/auth-login`           |
| Bug fix    | `fix/`        | `fix/cors-error`              |
| Docs       | `docs/`       | `docs/update-readme`           |
| Tests      | `test/`       | `test/auth-integration`        |
| Refactor   | `refactor/`   | `refactor/user-service`        |
| Chores     | `chore/`      | `chore/update-deps`            |

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

    <type>(<scope>): <short description>

Examples:

    feat(auth): add JWT login endpoint
    fix(frontend): resolve CORS error on API calls
    test(api): add Newman collection for auth routes
    docs(readme): clarify Flutter setup steps
    chore(infra): bump MongoDB image to 7.0

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `chore`, `ci`.

## Workflow

1. Sync your local main: `git pull origin main`
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes, keeping commits small and descriptive.
4. Run quality checks before pushing:

   # Backend / frontend / shared
   bun run lint
   bun run test

   # Mobile
   cd mobile
   flutter analyze
   flutter test

5. Push your branch: `git push origin feature/your-feature`
6. Open a pull request and fill in the PR template completely.
7. Request at least **one** reviewer. Two approvals for `main`-touching changes.
8. Address review feedback with new commits — don't force-push after review starts.

## Pull request rules

- PRs should be under ~400 lines of change where possible.
- Include screenshots or clips for UI changes (web or mobile).
- Link the related issue using `Closes #issue-number`.
- CI must pass before merge: lint, unit, integration, and API tests.
- Squash-merge into `main` to keep history clean.

## Code style

- **Formatting**: Prettier (config in `.prettierrc`) — format on save is set up in `.vscode/`.
- **Linting**: ESLint for JS/TS, `flutter analyze` for Dart.
- **Naming**: `camelCase` for variables/functions, `PascalCase` for React components and Dart classes, `UPPER_SNAKE_CASE` for constants.
- **Backend**: follow the layered MVC flow — route → controller → service → model. Don't put business logic in controllers.
- **Frontend**: keep API calls in `src/api/`, shared logic in hooks.
- **Comments**: explain *why*, not *what*.

## Testing expectations

- New service or util → add a **unit test** in `tests/unit/`.
- New route or controller → add an **integration test** in `tests/integration/`.
- New user-facing feature → cover the flow in `tests/functional/` and, if critical, `tests/e2e/`.
- New mobile feature → add a widget or `integration_test` in `mobile/`.
- Bug fix → add a test that reproduces the bug first, then fix it.

Reports go to `tests/reports/` (gitignored) — never commit them.

## Reporting bugs & requesting features

Use the issue templates in `.github/ISSUE_TEMPLATE/`:

- **Bug report**: for anything broken or behaving incorrectly.
- **Feature request**: for new features or improvements.

Fill in every section — incomplete issues will be closed until updated.

## Need help?

- Check `guides/` for setup and workflow guides.
- Check `docs/decisions/` (ADRs) for why things are built a certain way.
- Ask in your team channel, or open a `question:` labeled issue.
