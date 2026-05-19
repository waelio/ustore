# @waelio/ustore — Agent Guide

> **Package** `@waelio/ustore` · **Version** `2.0.0` · **License** MIT
> **Author** Wael Wahbeh <wahbehw@me.com> · https://waelio.com
> **Repo** https://github.com/waelio/ustore

---

## 1 — What is uStore?

`uStore` is a **universal storage abstraction** that gives you one small CRUD API (`get`, `set`, `has`, `remove`) across 14 storage backends — from browser `localStorage` to server-side `Keyv`, from Vue `Vuex`/`Pinia` to RxJS `BehaviorSubject` and Gun DB. Swap adapters without rewriting plumbing.

### Design Principles

- **One shape, many backends** — every adapter implements the `UStoreClassFunc` interface (or the minimal `UStoreClass`).
- **Dual access** — each adapter is available as a named export (`localStorage`) **and** via the `uStore` namespace (`uStore.local`).
- **SSR-safe** — browser-dependent adapters check `typeof window !== "undefined"` and fall back to memory.
- **Zero config** — import and use. No provider wrappers, no initialization ceremony.
- **Global exposure** — `window.uStore` in browsers, `globalThis.uStore` in Node.

---

## 2 — Directory Layout

```
ustore/
├── index.ts                 # Root entry — re-exports everything + attaches to globalThis
├── config.ts                # Top-level config placeholder
├── package.json             # Dual ESM/CJS/UMD exports, module aliases
├── tsconfig.json            # ES2020 target, multi-format builds
│
├── src/
│   ├── index.ts             # Browser entry — assembles uStore object + re-exports
│   ├── index.node.ts        # Node ESM entry — Gun replaced with throw-proxy
│   ├── server.ts            # Async server storage (Keyv, Mongo)
│   ├── types.ts             # Core interfaces & enums
│   ├── .d.ts                # Ambient type shims
│   │
│   ├── _stores/             # ★ All storage adapters live here
│   │   ├── agent.md         # ← This file
│   │   ├── index.ts         # Barrel — exports all adapters + assembles uStore
│   │   ├── localStorage.ts
│   │   ├── sessionStorage.ts
│   │   ├── cookieStorage.ts
│   │   ├── memoryStorage.ts
│   │   ├── secureStorage.ts
│   │   ├── configStorage.ts
│   │   ├── signalStorage.ts
│   │   ├── piniaStorage.ts
│   │   ├── vuexStorage.ts
│   │   ├── gunStorage.ts
│   │   ├── rxjsStorage.ts
│   │   ├── idbStorage.ts    # Planned — IndexedDB
│   │   └── webqlStorage.ts  # Planned — WebSQL
│   │
│   ├── core/
│   │   ├── index.ts         # UCORE class — nested-key object store
│   │   └── reactive.ts      # Dep/effect reactivity system (Object.defineProperty)
│   │
│   ├── config/
│   │   ├── index.ts         # Barrel — re-exports client/server/dev/prod
│   │   ├── client.ts        # Client-specific config defaults
│   │   ├── server.ts        # Server config stub
│   │   ├── dev.ts           # Dev config stub
│   │   └── prod.ts          # Prod config stub
│   │
│   └── messaging/
│       └── index.ts         # Socket.io messaging bridge (createMessagingStore)
│
├── __tests__/               # Jest test suite (jsdom)
│   ├── 1.Memory.test.ts … 13.Webql.test.ts   # Per-adapter tests
│   ├── e2e.test.ts          # Cross-adapter end-to-end
│   ├── messaging.test.ts    # Messaging bridge tests
│   ├── server.storage.test.ts / server.env.test.ts
│   ├── core.reactive.test.ts
│   └── uni.test.ts
│
├── lib/                     # Build output (gitignored, 4 formats)
│   ├── esm/                 # ESM for bundlers
│   ├── esm-node/            # ESM with Node resolution
│   ├── cjs/                 # CommonJS
│   └── umd/                 # UMD
│
├── types/                   # Generated .d.ts declarations
├── scripts/
│   └── fix-esm-extensions.js
└── .github/
    ├── copilot-instructions.md
    ├── workflows/            # CI (Node 18/20)
    └── ISSUE_TEMPLATE/
```

---

## 3 — Package Entrypoints

| Import path | Condition | Resolves to |
|---|---|---|
| `@waelio/ustore` | Browser / bundler | `lib/esm/src/index.js` |
| `@waelio/ustore` | Node ESM | `lib/esm-node/src/index.node.js` |
| `@waelio/ustore` | CJS require | `lib/cjs/src/index.js` |
| `@waelio/ustore/server` | Node ESM | `lib/esm-node/src/server.js` |
| `@waelio/ustore/server` | CJS require | `lib/cjs/src/server.js` |

---

## 4 — Core Interfaces

### `UStoreClassFunc` (full adapter shape)

```typescript
interface UStoreClassFunc {
  get(key: string): string | object | string[] | object[] | null | boolean;
  getItem(key: string): /* same */;
  set(key: string, value: any): void | any;
  setItem(key: string, value: any): void | any;
  has(key: string): string | object | string[] | object[] | null | boolean;
  hasItem(key: string): /* same */;
  remove(key: string): void | any;
  removeItem(key: string): void | any;
}
```

- `get` / `getItem` are aliases — so are `set` / `setItem`, `has` / `hasItem`, `remove` / `removeItem`.
- Every new adapter **must** implement all 8 methods.

### `UStoreServerClass` (async server adapter)

Same shape but every method returns a `Promise`. Also includes `clear()` and exposes the underlying `keyv` instance.

### `TypeUstore`

```typescript
type TypeUstore = {
  config: Tconfig;  cookie: Tcookie;   gun: Tgun;
  local: Tlocal;    memory: Tmemory;   pinia: Tpinia;
  secure: Tsecure;  session: Tsession; vuex: Tvuex;
  idb?: Tidb;       webql?: Twebql;    signal: Tsignal;
  rxjs: Trxjs;
};
```

### `UCORE` class (`src/core/index.ts`)

In-memory key-value store with:
- Colon-delimited nested keys (`"section:key"`) — one level deep only.
- `value` getter/setter for bulk state replacement.
- Used internally by `configStorage` and `memoryStorage`-style adapters.

---

## 5 — Storage Adapter Catalogue

| # | Adapter | `uStore.` key | Named export | Backend | Sync/Async | Runtime |
|---|---------|---------------|--------------|---------|------------|---------|
| 1 | localStorage | `local` | `localStorage` | `store2` (namespaced `uStore`) | Sync | Browser / SSR-safe |
| 2 | sessionStorage | `session` | `sessionStorage` | Native `window.sessionStorage` | Sync | Browser / SSR-safe |
| 3 | cookieStorage | `cookie` | `cookieStorage` | `document.cookie` | Sync | Browser / Node fallback |
| 4 | memoryStorage | `memory` | `memoryStorage` | Plain `Map`-like object | Sync | Universal |
| 5 | secureStorage | `secure` | `secureStorage` | In-memory + `waelio-utils` encrypt/decrypt | Sync | Universal |
| 6 | configStorage | `config` | `configStorage` | `UCORE` instance + nested keys | Sync | Universal |
| 7 | signalStorage | `signal` | `signalStorage` | In-memory `Map` | Sync | Universal |
| 8 | piniaStorage | `pinia` | `piniaStorage` | In-memory compatibility layer | Sync | Universal |
| 9 | vuexStorage | `vuex` | `vuexStorage` | Single-slot committed state | Sync | Universal |
| 10 | gunStorage | `gun` | `gunStorage` | Gun DB (chain-oriented) | Async | Browser / CJS |
| 11 | rxjsStorage | `rxjs` | `rxjsStorage` | RxJS `BehaviorSubject` | Sync | Universal |
| 12 | idbStorage | `idb` | `idbStorage` | IndexedDB (via `localforage`) | Async | Browser (planned) |
| 13 | webqlStorage | `webql` | `webqlStorage` | WebSQL (via `localforage`) | Async | Browser (planned) |
| 14 | serverStorage | — | `serverStorage` | `Keyv` (in-memory, Mongo, etc.) | Async | Node only |

### Node ESM caveat

In the native Node ESM entry (`index.node.ts`), `uStore.gun` is a **Proxy that throws** to avoid eager-import failures. Use `gunStorage` directly instead, or use CJS / a bundler.

---

## 6 — Messaging Bridge

`createMessagingStore(socket, options)` bridges `uStore` adapters with a Socket.io backend:

- **localStorage** → cached message history
- **sessionStorage** → session identity
- **signalStorage** → unread count, user list, connection state

Exported from root: `import { createMessagingStore } from "@waelio/ustore"`.

---

## 7 — Build System

### Commands

| Command | Purpose |
|---|---|
| `pnpm build` | Full pipeline: clean → ESM → ESM-Node → CJS → UMD → fix extensions → copy sources → format → lint |
| `pnpm build:esm` | ESM only (`lib/esm/`) |
| `pnpm build:esm-node` | Node ESM only (`lib/esm-node/`) |
| `pnpm build:cjs` | CommonJS only (`lib/cjs/`) |
| `pnpm build:umd` | UMD only (`lib/umd/`) |
| `pnpm test` | Jest with jsdom environment |
| `pnpm format` | Prettier on `src/**/*.ts` |
| `pnpm lint` | ESLint |

### Build pipeline detail

1. `pnpm cleanup` — removes `lib/`
2. Four `tsc` invocations with different `--module` flags
3. `postbuild:esm` / `postbuild:esmnode` — injects `{"type":"module"}` in the ESM output dirs, runs `fix-esm-extensions.js`
4. `copyfiles` — copies raw `src/` into `lib/`
5. `format` + `lint`

### TypeScript config

- **Target:** ES2020
- **Module:** ESNext (overridden per-build)
- **Declaration:** `types/` directory
- **Strict:** enabled
- **Libs:** `dom`, `es6`

---

## 8 — Testing

- **Framework:** Jest + `ts-jest` + `jest-environment-jsdom`
- **Config:** `jestconfig.json`
- **Naming convention:** `__tests__/N.AdapterName.test.ts`

### Test expectations

Each adapter test verifies:
1. `set` / `setItem` stores a value
2. `get` / `getItem` retrieves it
3. `has` / `hasItem` returns truthy
4. `remove` / `removeItem` deletes it
5. `has` returns falsy after removal
6. Both `uStore.adapterKey` and direct import work identically

### Running

```bash
pnpm test                    # All tests
pnpm test -- e2e.test.ts     # Cross-adapter E2E
pnpm test -- messaging.test  # Messaging bridge
```

---

## 9 — Conventions & Patterns

### Error handling

Every adapter method wraps its body in `try/catch`:

```typescript
get: (key: string) => {
  try {
    return implementation(key);
  } catch (error) {
    console.error("Error in get method:", error);
    return null;
  }
}
```

### SSR guard

```typescript
const isReady = typeof window !== "undefined";
if (!isReady) return fallback;
```

### Nested keys

`UCORE` supports `"parent:child"` — **one level deep only**. Deeper nesting throws.

### Module aliases (package.json `_moduleAliases`)

| Alias | Maps to |
|---|---|
| `@root` / `~` | `.` (project root) |
| `@src` | `src` |
| `@config` | `src/config` |
| `@depo` | `src/_stores` |
| `@uStore` | `lib/umd/src/index.js` |

### Global attachment

Both `src/index.ts` and `src/index.node.ts` attach `uStore` to `window` or `globalThis` at import time.

---

## 10 — How to Add a New Storage Adapter

1. **Create** `src/_stores/newStorage.ts` implementing `UStoreClassFunc` (all 8 methods).
2. **Import & re-export** in:
   - `src/_stores/index.ts` (barrel)
   - `src/index.ts` (browser entry)
   - `src/index.node.ts` (node entry — add SSR guard if needed)
   - `index.ts` (root entry)
3. **Add type alias** `export type Tnew = typeof newStorage` in all index files.
4. **Add to `TypeUstore`** type and the `uStore` object literal.
5. **Add to `StoreTypes` / `StorePlugins`** enums in `src/types.ts`.
6. **Write test** `__tests__/N.NewStorage.test.ts`.
7. **Update README** with usage examples.

---

## 11 — Publishing

```bash
pnpm test          # Must pass
pnpm build         # Multi-format output
npm publish --access public
```

The `prepublishOnly` script enforces `test + lint`.  
`files` array in `package.json` ships: `src/`, `lib/`, `types/`, `index.*`.

---

## 12 — Dependencies

### Runtime

| Package | Purpose |
|---|---|
| `store2` | Browser localStorage wrapper |
| `localforage` + `localforage-driver-memory` | IndexedDB / WebSQL (planned adapters) |
| `gun` | Decentralized DB adapter |
| `keyv` + `@keyv/mongo` | Server-side async storage |
| `rxjs` | BehaviorSubject-backed adapter |
| `vue` + `vuex` | Vue 3 reactivity & Vuex integration |
| `solid-js` | Signal storage inspiration |
| `waelio-utils` | Encryption for secureStorage |
| `browserify` | Legacy UMD support |

### Dev

TypeScript 4.9, Jest 29, ESLint 8, Prettier 2, ts-jest, jest-environment-jsdom.

---

## 13 — Quick Reference

```typescript
// Browser — one import, many stores
import { uStore, localStorage, signalStorage } from "@waelio/ustore";

uStore.local.set("key", "value");
uStore.memory.set("temp", { data: true });
signalStorage.set("online", true);

// Server — async Keyv
import { createServerStorage } from "@waelio/ustore/server";
const db = createServerStorage({ namespace: "app" });
await db.set("session", { user: "wael" });

// Messaging — Socket.io bridge
import { createMessagingStore } from "@waelio/ustore";
const chat = createMessagingStore(socket, { historyLimit: 100 });
chat.send("userId", "hello");
```
