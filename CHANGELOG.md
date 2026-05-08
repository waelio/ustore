# Changelog

All notable changes to this project will be documented in this file.

## [1.0.13] - 2026-05-08

- Docs: rewrote `README.md` from scratch for clearer installation, adapter coverage, server usage, runtime notes, and messaging examples.
- Packaging: no runtime code changes; release is documentation-focused.

## [1.0.12] - 2026-05-08

- Metadata: normalized `homepage` and `bugs.url` to the canonical `waelio/ustore` repository path.
- Packaging: no runtime code changes; release is metadata-only.

## [1.0.6] - 2025-11-05

- Docs: Added Getting Started to README; clarified Node ESM usage note.
- Badges: CI badge targets the `default` branch.
- Community: Added issue templates (bug report, feature request) and seeded CHANGELOG.
- CI: Confirmed npm-based workflow on `default` (Node 18/20), installs with `--ignore-scripts`.

## [1.0.5] - 2025-11-05

- Native Node ESM support: conditional export route for Node (`node.import`) with esm-node build.
- Improved ESM import specifiers (.js, /index.js) post-build to support Node ESM resolution.
- CI simplified to use npm for install/test on the `default` branch.
- README: Node ESM usage guidance; badge now targets the `default` branch.

## [1.0.4] - 2025-11-04

- Package exports corrected (types/import/require/default) and added Node condition.
- Build pipeline: esm, cjs, umd outputs; esm-node target introduced.
- Tests: all suites passing on Node 18/20.

---

Unreleased changes will appear here.
