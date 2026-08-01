# JOS One Engineering 1.0

A maintainable, dependency-free TypeScript PWA for The JAE Edit.

## Structure

- Root files are deployment-ready for GitHub Pages.
- `source/src/` contains the TypeScript source code.
- `source/tests/` contains automated domain tests.
- `assets/` contains compiled JavaScript modules.

## Build and test

```bash
cd source
npm run build
npm test
```

No third-party runtime dependencies are required.

## Data

Inventory and orders are stored locally in the browser. Earlier JOS localStorage records are migrated automatically. Download regular JSON backups until cloud sync is introduced.
