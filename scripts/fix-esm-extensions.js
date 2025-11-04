#!/usr/bin/env node
// Fix ESM internal relative imports in compiled output by appending .js extension
// so Node's ESM loader can resolve them without a bundler.
//
// - Scans lib/esm/src/**/*.js
// - Rewrites:
//   import ... from "./foo"       -> import ... from "./foo.js"
//   export ... from "../bar"      -> export ... from "../bar.js"
//   import("./baz")               -> import("./baz.js")
//
// Skips if specifier already ends with .js/.mjs/.json or contains protocol/hash/query.
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DEFAULT_DIR = path.join(ROOT, 'lib', 'esm', 'src');
const ESM_DIR = process.env.TARGET_DIR
  ? path.isAbsolute(process.env.TARGET_DIR)
    ? process.env.TARGET_DIR
    : path.join(ROOT, process.env.TARGET_DIR)
  : DEFAULT_DIR;

/** @param {string} p */
function isRelative(p) {
  return p.startsWith('./') || p.startsWith('../');
}

/** @param {string} p */
function hasExtension(p) {
  return /\.(js|mjs|json)$/i.test(p);
}

/** @param {string} p */
function hasQueryOrHash(p) {
  return /[#?]/.test(p);
}

/** @param {string} spec */
function maybeAppendJs(spec, fileDir) {
  if (!isRelative(spec)) return spec;
  if (hasExtension(spec)) return spec;
  if (hasQueryOrHash(spec)) return spec;
  // Resolve relative to current file
  const asPath = path.join(fileDir, spec);
  try {
    const stat = fs.existsSync(asPath) && fs.statSync(asPath);
    if (stat && stat.isDirectory()) {
      // Directory import -> use index.js
      const indexJs = path.join(asPath, 'index.js');
      if (fs.existsSync(indexJs)) return spec + '/index.js';
    }
  } catch {}
  // Try file.js then /index.js
  const candidateFile = path.join(fileDir, spec + '.js');
  if (fs.existsSync(candidateFile)) return spec + '.js';
  const candidateIndex = path.join(fileDir, spec, 'index.js');
  if (fs.existsSync(candidateIndex)) return spec + '/index.js';
  // Default: append .js
  return spec + '.js';
}

/** Fix known bare subpath specifiers that need explicit extension in Node ESM */
function maybeFixBare(spec) {
  // Handle old GUN subpath import used by this repo: 'gun/gun' -> 'gun/gun.js'
  if (/^gun\/gun($|[?#])/.test(spec)) {
    return spec.replace(/^gun\/gun($|[?#])/, 'gun/gun.js$1');
  }
  return spec;
}

/** @param {string} code */
function transform(code, fileDir) {
  // from "..."
  code = code.replace(/(from\s+)(["'])([^"']+)(\2)/g, (m, pre, q, spec, q2) => {
    let next = maybeAppendJs(spec, fileDir);
    if (next === spec) next = maybeFixBare(spec);
    return pre + q + next + q2;
  });
  // dynamic import("...")
  code = code.replace(/(import\s*\(\s*)(["'])([^"']+)(\2)(\s*\))/g, (m, pre, q, spec, q2, suf) => {
    let next = maybeAppendJs(spec, fileDir);
    if (next === spec) next = maybeFixBare(spec);
    return pre + q + next + q2 + suf;
  });
  return code;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
    } else if (ent.isFile() && full.endsWith('.js')) {
      const before = fs.readFileSync(full, 'utf8');
      const after = transform(before, path.dirname(full));
      if (after !== before) {
        fs.writeFileSync(full, after, 'utf8');
      }
    }
  }
}

if (!fs.existsSync(ESM_DIR)) {
  console.error('[fix-esm-extensions] ESM dir not found:', ESM_DIR);
  process.exit(0);
}

walk(ESM_DIR);
console.log('[fix-esm-extensions] Patched ESM import specifiers in', ESM_DIR);
