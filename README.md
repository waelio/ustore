# uStore

Universal storage abstraction for browser, reactive, Vue, and server-side runtimes.

[![Join the chat at https://discord.gg/tBZ2Fmdb7E](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/tBZ2Fmdb7E)
[![CI](https://github.com/waelio/ustore/actions/workflows/ci.yml/badge.svg?branch=default)](https://github.com/waelio/ustore/actions/workflows/ci.yml?query=branch%3Adefault)
[![NPM version](https://img.shields.io/npm/v/@waelio/ustore.svg?style=flat&color=red&label=NPM)](https://www.npmjs.com/package/@waelio/ustore)
[![NPM monthly downloads](https://img.shields.io/npm/dm/@waelio/ustore.svg?style=flat)](https://npmjs.org/package/@waelio/ustore)
[![NPM total downloads](https://img.shields.io/npm/dt/@waelio/ustore.svg?style=flat&color=purple&label=Downloads)](https://npmjs.org/package/@waelio/ustore)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/waelio?locale.x=en_US)

uStore provides one small CRUD-style API across multiple storage backends so you can move between browser state, in-memory state, Vue integrations, and server storage without rewriting the same set/get/remove glue.

## Why uStore

- One consistent interface across multiple adapters
- Works with `uStore.<adapter>` and direct named exports
- Browser-friendly adapters with server-safe fallbacks where applicable
- Includes reactive state, encrypted memory, config-backed storage, and server-side Keyv storage
- Ships a messaging bridge that composes multiple adapters together

## Installation

```bash
npm install @waelio/ustore
```

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

## Package entry points

### Root package: `@waelio/ustore`

Available exports include:

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

### Server package: `@waelio/ustore/server`

Use the dedicated server entry for async Keyv-backed storage:

- `serverStorage`
- `createServerStorage`
- `createMongoServerStorage`

## Available adapters

| Adapter | Access pattern | Runtime | Notes |
| --- | --- | --- | --- |
| `local` | `uStore.local`, `localStorage` | Browser / SSR-friendly | Uses `store2` under the hood. |
| `session` | `uStore.session`, `sessionStorage` | Browser / SSR-friendly | Session-scoped storage via `store2`. |
| `cookie` | `uStore.cookie`, `cookieStorage` | Browser / Node fallback | `get()` returns the raw `key=value` cookie entry. |
| `memory` | `uStore.memory`, `memoryStorage` | Universal | Keyed in-memory storage. |
| `pinia` | `uStore.pinia`, `piniaStorage` | Universal | Current implementation behaves like keyed in-memory storage. |
| `vuex` | `uStore.vuex`, `vuexStorage` | Universal | Stores the latest committed value; `get()` / `has()` do not need a key. |
| `secure` | `uStore.secure`, `secureStorage` | Universal | In-memory encrypted values using `waelio-utils`. |
| `config` | `uStore.config`, `configStorage` | Universal | Supports colon-separated nested keys like `client:apiUrl`. |
| `signal` | `uStore.signal`, `signalStorage` | Universal | Reactive in-memory state store. |
| `gun` | `uStore.gun`, `gunStorage` | Browser / CommonJS / direct import | Experimental, network-backed, and chain-oriented. |
| `server` | `serverStorage`, `createServerStorage` | Node / server | Async Keyv-backed storage from `@waelio/ustore/server`. |

## Browser storage examples

### Local storage

```ts
import { localStorage, uStore } from "@waelio/ustore";

uStore.local.set("profile", { name: "Wael" });
const fromUStore = uStore.local.get("profile");

localStorage.set("theme", "dark");
const fromNamedExport = localStorage.get("theme");

console.log(fromUStore); // { name: "Wael" }
console.log(fromNamedExport); // "dark"
```

### Session storage

```ts
import { sessionStorage, uStore } from "@waelio/ustore";

uStore.session.set("draft", { title: "hello" });
console.log(uStore.session.get("draft")); // { title: "hello" }

sessionStorage.set("token", "abc123");
console.log(sessionStorage.has("token")); // true
sessionStorage.remove("token");
```

### Cookie storage

```ts
import { cookieStorage, uStore } from "@waelio/ustore";

uStore.cookie.set("theme", "dark");
console.log(uStore.cookie.get("theme")); // "theme=dark"

cookieStorage.set("locale", "en-US");
console.log(cookieStorage.has("locale")); // true
cookieStorage.remove("locale");
```

Use simple strings for cookies when possible. Complex values are string-coerced by cookie semantics.

## In-memory and reactive examples

### Memory storage

```ts
import { memoryStorage, uStore } from "@waelio/ustore";

uStore.memory.set("count", 42);
console.log(uStore.memory.get("count")); // 42

memoryStorage.setItem("feature", { enabled: true });
console.log(memoryStorage.getItem("feature")); // { enabled: true }
memoryStorage.removeItem("feature");
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

### Secure storage

```ts
import { secureStorage, uStore } from "@waelio/ustore";

uStore.secure.set("secret", "hello world");
console.log(uStore.secure.getItem("secret")); // "hello world"

secureStorage.set("token", "signed-value", { salt: "demo-salt" });
console.log(secureStorage.getItem("token", { salt: "demo-salt" }));
```

### Config storage

```ts
import { configStorage, uStore } from "@waelio/ustore";

uStore.config.set("client:apiUrl", "https://api.example.com");
console.log(uStore.config.get("client:apiUrl")); // "https://api.example.com"

configStorage.set("featureFlags", { dashboard: true });
console.log(configStorage.get("featureFlags")); // { dashboard: true }
console.log(configStorage.client()); // client config bucket
console.log(configStorage.server()); // server config bucket
console.log(configStorage.dev()); // dev/prod override bucket
```

## Vue adapters

### Pinia adapter

```ts
import { piniaStorage, uStore } from "@waelio/ustore";

uStore.pinia.set("theme", "dark");
console.log(uStore.pinia.get("theme")); // "dark"

piniaStorage.setItem("language", "en");
console.log(piniaStorage.hasItem("language")); // true
piniaStorage.removeItem("language");
```

At the moment, the Pinia adapter behaves like a keyed in-memory store, which makes it predictable in tests and SSR environments.

### Vuex adapter

```ts
import { vuexStorage, uStore } from "@waelio/ustore";

uStore.vuex.set("status", "ready");
console.log(uStore.vuex.get()); // "ready"
console.log(uStore.vuex.has()); // true
uStore.vuex.remove("status");

vuexStorage.setItem("message", { text: "hello" });
console.log(vuexStorage.getItem()); // { text: "hello" }
```

The current Vuex adapter stores the latest committed value in a single slot, so `get()` and `has()` do not require a key.

## Gun adapter

```ts
import { gunStorage } from "@waelio/ustore";

await gunStorage.set("room", { hello: "world" });
const roomRef = await gunStorage.get("room");

console.log(roomRef);
```

The Gun adapter is still experimental. Reads are chain-oriented and depend on your Gun peer configuration rather than behaving like a purely synchronous JSON store.

### Native Node ESM note

In the native Node ESM entry, `uStore.gun` intentionally throws to avoid eager-import issues. Use one of these options instead:

- import `gunStorage` directly from `@waelio/ustore`
- use CommonJS if you need `uStore.gun`

## Server-side storage

Use the server subpath when you want async storage backed by `Keyv`.

```ts
import { createServerStorage } from "@waelio/ustore/server";

const store = createServerStorage({ namespace: "sessions" });

await store.set("session:waelio", {
  role: "owner",
  authenticated: true,
});

console.log(await store.get("session:waelio"));
console.log(await store.has("session:waelio"));

await store.remove("session:waelio");
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

`createMessagingStore` is a client-side bridge between `@waelio/ustore` and a Socket.io-compatible messaging backend.

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
- `signalStorage` for reactive state like unread count and connected users

## End-to-end coverage

The end-to-end suite lives in `__tests__/e2e.test.ts` and currently exercises:

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
- method alias consistency (`get` / `getItem`, `set` / `setItem`, and so on)

There are also dedicated test files for the messaging bridge, server namespace behavior, and Node runtime behavior.

## Development

```bash
pnpm test -- e2e.test.ts
pnpm test
pnpm build
```

## Planned adapters

`idbStorage` and `webqlStorage` are still planned and are not currently exported from the package.

## Releasing and publishing

The release workflow builds, tests, and publishes to npm when you push a semver tag.

1. Bump the version in `package.json`.
2. Commit the change.
3. Push a tag such as `v1.0.11`.

You can also publish locally after a successful build and test run:

```bash
pnpm build
pnpm test
npm publish --access public
```

## References

- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [MDN: Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Vuex documentation](https://vuex.vuejs.org/)
- [Pinia documentation](https://pinia.vuejs.org/)
- [Gun documentation](https://gun.eco/)
