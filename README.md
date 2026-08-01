# JOS One

The operating system for The JAE Edit.

## Local development

```bash
npm install
npm run dev
```

## Tests and production build

```bash
npm test
npm run build
```

## GitHub Pages setup

1. Upload this complete project to the `jos-one` repository.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push changes to `main`. The workflow tests, builds and publishes automatically.

## Working method

- `main` contains deployable code.
- Use GitHub Issues for bugs and feature requests.
- Update `CHANGELOG.md` and `RELEASE_NOTES.md` for every release.
- Create GitHub Releases using semantic versions such as `v0.1.0`.

## Current limitation

Inventory is stored locally in the browser. Cloud backup and multi-device sync are planned later.
