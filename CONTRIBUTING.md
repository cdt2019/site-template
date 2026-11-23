# Contributing

Bug reports, docs fixes and focused pull requests are welcome.

## Set up

```bash
git clone https://github.com/cdt2019/site-template.git
cd site-template
npm install
npm run dev
```

## Before you open a pull request

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Guidelines

- Keep pull requests small and about one thing.
- This template stays lightweight: no database, accounts or backend. Features that need them belong in [ai-saas-template](https://github.com/cdt2019/ai-saas-template).
- Match the surrounding code: naming, comment density and structure.
- Put user-facing text in both `src/i18n/dictionaries/en.ts` and `zh.ts`.
- Keep tool logic in pure functions with tests, like `src/tool/analyze.ts`.
- Never commit secrets or `.env*` files.

Report security problems privately, as described in [SECURITY.md](SECURITY.md).

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
