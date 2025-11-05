# A universal store cross-frameworks

### @waelio/ustore

Visit the source code [ustore](https://github.com/waelio/ustore) on gitHub.

[![Join the chat at https://discord.gg/tBZ2Fmdb7E](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/tBZ2Fmdb7E) [![CI](https://github.com/waelio/ustore/actions/workflows/ci.yml/badge.svg?branch=default)](https://github.com/waelio/ustore/actions/workflows/ci.yml?query=branch%3Adefault) [![NPM version](https://img.shields.io/npm/v/@waelio/ustore.svg?style=flat&color=red&label=NPM)](https://www.npmjs.com/package/@waelio/ustore) [![NPM monthly downloads](https://img.shields.io/npm/dm/@waelio/ustore.svg?style=flat)](https://npmjs.org/package/@waelio/ustore) [![NPM total downloads](https://img.shields.io/npm/dt/@waelio/ustore.svg?style=flat&color=purple&label=Downloads)](https://npmjs.org/package/@waelio/ustore) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/waelio?locale.x=en_US)

<hr />

## Getting started

Install:

```bash
npm install @waelio/ustore
```

Use (ESM):

```js
import { uStore } from "@waelio/ustore";

uStore.local.set("greeting", "hello");
console.log(uStore.local.get("greeting")); // "hello"
```

Use (CommonJS):

```js
const { uStore } = require("@waelio/ustore");

uStore.local.set("greeting", "hello");
console.log(uStore.local.get("greeting")); // "hello"
```

## Node ESM usage

The package ships conditional exports for native Node ESM, CommonJS, and bundlers:

- ESM (Node 18+/20+): `import { uStore } from '@waelio/ustore'`
- CommonJS: `const { uStore } = require('@waelio/ustore')`

Note about Gun adapter in Node ESM: `uStore.gun` is intentionally unavailable in the native Node ESM entry to avoid eager import pitfalls. Use one of the following instead:

- Import the adapter directly: `import { gunStorage } from '@waelio/ustore'`
- Or use CommonJS to access `uStore.gun`: `const { uStore } = require('@waelio/ustore')`

Example (Node ESM):

```js
import { uStore, gunStorage } from "@waelio/ustore";

uStore.local.set("key", "value");

// uStore.gun will throw in Node ESM. Use gunStorage directly:
gunStorage.set("room", { hello: "world" });
```

Example (CommonJS):

```js
const { uStore } = require("@waelio/ustore");

uStore.local.set("key", "value");
uStore.gun.set("room", { hello: "world" });
```

<hr />

## uStore project is a plugin I'v wanted for a while, the ability to have my own state-management in my projects.

### As this is a pilot, please feel free to join the discussion. All are welcomed.

<hr />

### For more examples, please vitit [testing-ustore](https://github.com/waelio/testing-ustore) for help.

<hr />

#### Crurrent stores:

<ol>
<li>local: <a href="#local">local</a></li>
<li>session: <a href="#session">session</a></li>
<li>cookie: <a href="#cookie">cookie</a></li>
<li>vuex: <a href="#vuex">vuex</a></li>
<li>pinia: <a href="#pinia">pinia</a></li>
<li>gun: <a href="#gun">gun</a></li>
<li>memory: <a href="#memory">memory</a></li>
<li>secure: <a href="#secure">secure</a></li>
<li>config: <a href="#config">config</a></li>
<li>idb: <a href="#idb">index Db -pending</a></li>
<li>webql: <a href="#webql">wb sql -pending</a></li>
</ol>

<hr>

# local

Window local Storage,<a href="#references"><i> see docs below</i></a>

```js
import { uStore, localStorage } from "@waelio/ustore";

describe("Local storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.local.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.local.get(label)).toEqual(payload);
  });
  localStorage.set(label, payload);
  test("localStorage set & get", () => {
    expect(localStorage.get(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# session

Window session Storage,<a href="#references"><i> see docs below</i></a>

```js
import { uStore, sessionStorage } from "@waelio/ustore";

describe("Session storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.session.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.session.get(label)).toEqual(payload);
  });
  sessionStorage.set(label, payload);
  test("sessionStorage set & get", () => {
    expect(sessionStorage.get(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# cookie

Document Cookies,<a href="#references"><i> see docs below</i></a>

```js
import { uStore, cookieStorage } from "@waelio/ustore";

describe("Cookie storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.cookie.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.cookie.get(label)).toEqual(`${label}=${payload}`);
  });
  cookieStorage.set(label, payload);
  test("cookieStorage set & get", () => {
    expect(cookieStorage.get(label)).toEqual(`${label}=${payload}`);
  });
});
```

[Back to TOP](#)

# vuex

Vue state management,<a href="#references"><i> see docs below</i></a>

```js
import { uStore, vuexStorage } from "@waelio/ustore";

describe("Vuex storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.vuex.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.vuex.get()).toEqual(payload);
  });
  vuexStorage.set(label, payload);
  test("vuexStorage set & get", () => {
    expect(vuexStorage.get()).toEqual(payload);
  });
});
```

[Back to TOP](#)

# pinia

Pinia State Management,<a href="#references"><i> see docs below</i></a>

```js
import { uStore, piniaStorage } from "@waelio/ustore";

describe("Pinia storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.pinia.set(payload);
  test("pinia set & get", () => {
    expect(uStore.pinia.get()).toEqual(payload);
  });
  piniaStorage.set(payload);
  test("piniaStorage set & get", () => {
    expect(piniaStorage.get()).toEqual(payload);
  });
});
```

[Back to TOP](#)

# gun

Gun DB, ,<a href="#references"><i> see docs below</i></a>

```js
import { uStore } from "@waelio/ustore";

// Did not pass testing yet
uStore.gun.set("testName", "test Payload");
uStore.gun.get("testName") === "test Payload";
```

[Back to TOP](#)

# memory

In memory storage

```js
import { uStore, memoryStorage } from "@waelio/ustore";

describe("Memory storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.memory.set(label, payload);

  test("uStore set & get", () => {
    expect(uStore.memory.get(label)).toEqual(payload);
  });
  memoryStorage.set(label, payload);
  test("memoryStorage set & get", () => {
    expect(memoryStorage.get(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# secure

Enctypted and Decrypted storage

```js
import { uStore, secureStorage } from "@waelio/ustore";

describe("Secure storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.secure.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.secure.getItem(label)).toEqual(payload);
  });
  secureStorage.set(label, payload);
  test("secureStorage set & get", () => {
    expect(secureStorage.getItem(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# config

Config is home-brewed solution, more documentations coming soon.

```js
import { uStore, configStorage } from "@waelio/ustore";

const payload = "Test Payload1";
const label = "test";

describe("uStore Storage", () => {
  uStore.config.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.config.getItem(label)).toEqual(payload);
  });
  configStorage.set(label, payload);
  test("configStorage set & get", () => {
    expect(configStorage.getItem(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# idb

Not implemented yet

```js
import { uStore, idbStorage } from "@waelio/ustore";

describe("Idb storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.idb.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.idb.getItem(label)).toEqual(payload);
  });
  idbStorage.set(label, payload);
  test("idbStorage set & get", () => {
    expect(idbStorage.getItem(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

# webql

Not implemented yet

```js
import { uStore, webqlStorage } from "@waelio/ustore";

describe("webqlStorage storage", () => {
  const payload = "Test Payload1";
  const label = "test";
  uStore.webql.set(label, payload);
  test("uStore set & get", () => {
    expect(uStore.webql.getItem(label)).toEqual(payload);
  });
  webqlStorage.set(label, payload);
  test("webqlStorage set & get", () => {
    expect(webqlStorage.getItem(label)).toEqual(payload);
  });
});
```

[Back to TOP](#)

#

# References

<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">Window Local storage</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" target="_blank">Window Session Storage</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie" target="_blank">Document Cookie storage</a></li>
<li><a href="https://vuex.vuejs.org/" target="_blank">Vuex state management</a></li>
<li><a href="https://pinia.vuejs.org/" target="_blank">Pinia state management</a></li>
<li><a href="https://gun.eco/" target="_blank">Gun DB</a></li>
<hr/>

[Back to TOP](#)

## Releasing and publishing

This repo ships via GitHub Actions. To cut a release and publish to npm:

- Ensure a repository secret named NPM_TOKEN is configured with publish access to the @waelio scope.
- Bump the version in package.json and commit your changes.
- Push a semver tag to trigger the release workflow, for example v0.0.116.

The Release workflow will build, test, and publish to npm if tests pass. You can also publish locally if needed:

```bash
# optional: build and test locally first
pnpm build
pnpm test

# requires being logged in to npm (npm whoami)
npm publish --access public
```

CI runs on every push and pull request to master/main and tests on Node 18 and 20.
