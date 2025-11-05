# Changelog

All notable changes to this project will be documented in this file.

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
