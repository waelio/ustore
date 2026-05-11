# uStore

Universal storage for browser, Vue, reactive, and server-side runtimes.

[![Join the chat at https://discord.gg/tBZ2Fmdb7E](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/tBZ2Fmdb7E)
[![CI](https://github.com/waelio/ustore/actions/workflows/ci.yml/badge.svg?branch=default)](https://github.com/waelio/ustore/actions/workflows/ci.yml?query=branch%3Adefault)
[![NPM version](https://img.shields.io/npm/v/@waelio/ustore.svg?style=flat&color=red&label=NPM)](https://www.npmjs.com/package/@waelio/ustore)
[![NPM monthly downloads](https://img.shields.io/npm/dm/@waelio/ustore.svg?style=flat)](https://www.npmjs.com/package/@waelio/ustore)
[![NPM total downloads](https://img.shields.io/npm/dt/@waelio/ustore.svg?style=flat&color=purple&label=Downloads)](https://www.npmjs.com/package/@waelio/ustore)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/waelio?locale.x=en_US)

`uStore` gives you one small CRUD-style API across multiple storage backends so you can switch between browser state, in-memory state, Vue integrations, and server storage without rewriting the same `get` / `set` / `remove` plumbing over and over.

## Why use uStore

- One familiar API across multiple storage adapters
- Works with both `uStore.<adapter>` and direct named exports
- Browser-friendly adapters with SSR-safe fallbacks where applicable
- Includes encrypted memory, config-backed storage, server-side Keyv storage, and a messaging bridge
- Ships ESM, Node ESM, CommonJS, UMD, and TypeScript declarations

## Install

```bash
pnpm add @waelio/ustore
```

Or with npm:

```bash
npm install @waelio/ustore
```

The server entrypoint is included in the same package and is imported via `@waelio/ustore/server`.

## Quick start

```ts
import { uStore } from "@waelio/ustore";

uStore.local.set("greeting", "hello");

const greeting = uStore.local.get("greeting");
const exists = uStore.local.has("greeting");

console.log(greeting); // "hello"
console.log(exists); // true

uStore.local.remove("greeting");
```

`uStore` is also attached to `window.uStore` in browsers and `globalThis.uStore` in non-browser runtimes.

## Package entrypoints

| Import path | Purpose |
| --- | --- |
| `@waelio/ustore` | Main adapter exports, `uStore`, and the messaging bridge |
| `@waelio/ustore/server` | Async server-side storage backed by `Keyv` |

### Root exports

- `uStore`
- `localStorage`
- `sessionStorage`
- `cookieStorage`
- `memoryStorage`
- `piniaStorage`
- `vuexStorage`
- `gunStorage`
- `secureStorage`
- `configStorage`
- `signalStorage`
- `createMessagingStore`

### Server exports

- `serverStorage`
- `createServerStorage`
- `createMongoServerStorage`

## Adapter overview

| Adapter | Access pattern | Runtime | Notes |
| --- | --- | --- | --- |
| `local` | `uStore.local`, `localStorage` | Browser / SSR-friendly | Local storage wrapper. |
| `session` | `uStore.session`, `sessionStorage` | Browser / SSR-friendly | Session storage wrapper. |
| `cookie` | `uStore.cookie`, `cookieStorage` | Browser / Node fallback | `get()` returns the raw `key=value` cookie entry. |
| `memory` | `uStore.memory`, `memoryStorage` | Universal | Keyed in-memory storage. |
| `pinia` | `uStore.pinia`, `piniaStorage` | Universal | Current compatibility layer behaves like an in-memory store. |
| `vuex` | `uStore.vuex`, `vuexStorage` | Universal | Reads the latest committed value from a single slot. |
| `secure` | `uStore.secure`, `secureStorage` | Universal | In-memory encrypted values via `waelio-utils`. |
| `config` | `uStore.config`, `configStorage` | Universal | Supports nested keys such as `client:apiUrl`. |
| `signal` | `uStore.signal`, `signalStorage` | Universal | Lightweight in-memory state for reactive-style workflows. |
| `gun` | `uStore.gun`, `gunStorage` | Browser / CommonJS / direct import | Experimental, chain-oriented Gun integration. |
| `server` | `serverStorage`, `createServerStorage` | Node / server | Async Keyv-backed storage from `@waelio/ustore/server`. |

## The common shape

Most adapters expose aliases for the same basic operations:

```ts
type StoreLike = {
  get(key: string): unknown;
  getItem(key: string): unknown;
  set(key: string, value: unknown): unknown;
  setItem(key: string, value: unknown): unknown;
  has(key: string): unknown;
  hasItem(key: string): unknown;
  remove(key: string): unknown;
  removeItem(key: string): unknown;
};
```

That means you can swap adapters without changing the overall call style.

## Browser adapters

### Local storage

```ts
import { localStorage, uStore } from "@waelio/ustore";

uStore.local.set("profile", { name: "Wael" });
console.log(uStore.local.get("profile"));

localStorage.set("theme", "dark");
console.log(localStorage.has("theme")); // true
```

### Session storage

```ts
import { sessionStorage, uStore } from "@waelio/ustore";

uStore.session.set("draft", { title: "Hello" });
console.log(uStore.session.get("draft"));

sessionStorage.set("token", "abc123");
sessionStorage.remove("token");
```

### Cookie storage

```ts
import { cookieStorage, uStore } from "@waelio/ustore";

uStore.cookie.set("theme", "dark");
console.log(uStore.cookie.get("theme")); // "theme=dark"

cookieStorage.set("locale", "en-US");
console.log(cookieStorage.has("locale")); // true
```

Cookie values are written as simple cookie strings, so plain strings are usually the best fit.

## In-memory and utility adapters

### Memory storage

```ts
import { memoryStorage, uStore } from "@waelio/ustore";

uStore.memory.set("count", 42);
console.log(uStore.memory.get("count")); // 42

memoryStorage.setItem("feature", { enabled: true });
console.log(memoryStorage.getItem("feature"));
```

### Secure storage

```ts
import { secureStorage, uStore } from "@waelio/ustore";

uStore.secure.set("secret", "hello world");
console.log(uStore.secure.getItem("secret"));

secureStorage.set("token", "signed-value", { salt: "demo-salt" });
console.log(secureStorage.getItem("token", { salt: "demo-salt" }));
```

### Config storage

```ts
import { configStorage, uStore } from "@waelio/ustore";

uStore.config.set("client:apiUrl", "https://api.example.com");
console.log(uStore.config.get("client:apiUrl"));

configStorage.set("featureFlags", { dashboard: true });
console.log(configStorage.get("featureFlags"));
console.log(configStorage.client());
console.log(configStorage.server());
console.log(configStorage.dev());
```

### Signal storage

```ts
import { signalStorage, uStore } from "@waelio/ustore";

uStore.signal.set("online", true);
console.log(uStore.signal.get("online")); // true

signalStorage.set("users", ["alice", "bob"]);
console.log(signalStorage.has("users")); // true
signalStorage.remove("users");
```

## Vue adapters

### Pinia adapter

```ts
import { piniaStorage, uStore } from "@waelio/ustore";

uStore.pinia.set("theme", "dark");
console.log(uStore.pinia.get("theme"));

piniaStorage.setItem("language", "en");
console.log(piniaStorage.hasItem("language"));
```

The current Pinia adapter is a compatibility layer backed by in-memory state, which makes it predictable in SSR and test environments.

### Vuex adapter

```ts
import { vuexStorage, uStore } from "@waelio/ustore";

uStore.vuex.set("status", "ready");
console.log(uStore.vuex.get());
console.log(uStore.vuex.has());

vuexStorage.setItem("message", { text: "hello" });
console.log(vuexStorage.getItem());
```

The current Vuex adapter stores the latest committed value in a single slot, so reads do not need a key.

## Gun adapter

```ts
import { gunStorage } from "@waelio/ustore";

await gunStorage.set("room", { hello: "world" });
const roomRef = await gunStorage.get("room");

console.log(roomRef);
```

The Gun adapter is experimental and chain-oriented, so it behaves differently from the purely synchronous adapters.

### Native Node ESM note

In the native Node ESM entry, `uStore.gun` intentionally throws to avoid eager-import issues. If you need Gun in that environment:

- import `gunStorage` directly from `@waelio/ustore`
- or use CommonJS / a bundler-based environment

## Server-side storage

Use `@waelio/ustore/server` when you want async storage backed by `Keyv`.

```ts
import { createServerStorage } from "@waelio/ustore/server";

const store = createServerStorage({
  namespace: "sessions",
  ttl: 1000 * 60 * 60,
});

await store.set("session:waelio", {
  role: "owner",
  authenticated: true,
});

console.log(await store.get("session:waelio"));
console.log(await store.has("session:waelio"));

await store.remove("session:waelio");
```

There is also a ready-to-use singleton:

```ts
import { serverStorage } from "@waelio/ustore/server";

await serverStorage.set("healthcheck", "ok");
console.log(await serverStorage.get("healthcheck"));
```

### Mongo-backed server storage

```ts
import { createMongoServerStorage } from "@waelio/ustore/server";

const store = createMongoServerStorage("mongodb://127.0.0.1:27017/ustore", {
  namespace: "waelio-auth",
});

await store.set("user:1", { role: "admin" });
console.log(await store.getItem("user:1"));
```

## Messaging bridge

`createMessagingStore` is a client-side bridge between uStore adapters and a Socket.io-compatible messaging backend.

Install a Socket.io client in the consuming app if you do not already have one:

```bash
pnpm add socket.io-client
```

Then wire it up:

```ts
import { io } from "socket.io-client";
import { createMessagingStore } from "@waelio/ustore";

const socket = io("https://waelio-messaging.onrender.com");
const store = createMessagingStore(socket, {
  historyLimit: 200,
  storagePrefix: "wm",
});

const unsubscribe = store.onMessage((message) => {
  console.log("incoming", message.senderId, message.payload);
});

store.send("userId-abc", "hello!");
store.broadcast({ text: "hello everyone" });

const history = await store.loadHistory();
console.log(history.length);
console.log(store.getUnread());

unsubscribe();
store.destroy();
```

The messaging bridge uses:

- `localStorage` for cached history
- `sessionStorage` for session identity
- `signalStorage` for unread count, user list, and connection state

## Runtime notes

- Browser-oriented adapters such as local, session, and cookie storage include fallbacks where applicable so they can still behave safely during SSR or non-browser execution.
- `uStore.gun` is intentionally unavailable in native Node ESM via the `uStore` object, but `gunStorage` remains exportable.
- `idbStorage` and `webqlStorage` exist in the source tree as planned adapters and are not currently exported from the public package.

## Test coverage

The test suite currently covers:

- `localStorage`
- `sessionStorage`
- `cookieStorage`
- `memoryStorage`
- `piniaStorage`
- `vuexStorage`
- `secureStorage`
- `configStorage`
- `signalStorage`
- `createServerStorage`
- cross-adapter isolation
- alias consistency such as `get` / `getItem` and `set` / `setItem`
- messaging behavior and Node runtime behavior

## Development

```bash
pnpm test -- e2e.test.ts
pnpm test
pnpm build
```

## Publishing

Typical local release flow:

```bash
pnpm test
pnpm build
npm publish --access public
```

## References

- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [MDN: Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Vuex documentation](https://vuex.vuejs.org/)
- [Pinia documentation](https://pinia.vuejs.org/)
- [Gun documentation](https://gun.eco/)

- [https://waelio.com/packages/@waelio/ustore](https://waelio.com/packages/@waelio/ustore)

