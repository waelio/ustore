# A universal store cross-frameworks
### @waelio/ustore
Visit the source code [ustore](https://github.com/waelio/ustore) on gitHub.

[![Join the chat at https://discord.gg/tBZ2Fmdb7E](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/tBZ2Fmdb7E)
 [![NPM version](https://img.shields.io/npm/v/@waelio/ustore.svg?style=flat&color=red&label=NPM)](https://www.npmjs.com/package/@waelio/ustore) [![NPM monthly downloads](https://img.shields.io/npm/dm/@waelio/ustore.svg?style=flat)](https://npmjs.org/package/@waelio/ustore) [![NPM total downloads](https://img.shields.io/npm/dt/@waelio/ustore.svg?style=flat&color=purple&label=Downloads)](https://npmjs.org/package/@waelio/ustore)[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/waelio?locale.x=en_US)
<hr />

## uStore is a project is a plugin I'v wanted for a while, the ability to have my own state-management in my projects.

### As this is a pilot, please feel free to join the discussion. All are welcomed.
#### Next is Indexed DB & maybe Web SQL.

#### Crurrent stores: 
<ol>
<li>local: <a href="#local">local</a></li>
<li>session: <a href="#session">session</a></li>
<li>cookie: <a href="#cookie">cookie</a></li>
<li>vuex: <a href="#vuex">vuex</a></li>
<li>pinia: <a href="#pinia">pinia</a></li>
<li>gun: <a href="#gun">gun</a></li>
<li>memory: <a href="#memory">memory</a></li>
<li>config: <a href="#config">config - underconstruction </a></li>
</ol>

<hr>

# local
Window local Storage,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
ustore.local.set('testName', 'test Payload')
ustore.local.get('testName') === 'test Payload'
```
[Back to TOP](#)
# session
Window session Storage,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
uStore.session.set('testName', 'test Payload')
uStore.session.get('testName') === 'test Payload'
```
[Back to TOP](#)
# cookie
Document Cookies,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
uStore.cookie.set('testName', 'test Payload')
uStore.cookie.get('testName') === 'test Payload'
```
[Back to TOP](#)
# vuex
Vue state management,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
uStore.vuex.set('testName', 'test Payload')
uStore.vuex.get('testName') === 'test Payload'
```
[Back to TOP](#)
# pinia
Pinia State Management,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
uStore.pinia.set('testName', 'test Payload')
uStore.pinia.get('testName') === 'test Payload'
```
[Back to TOP](#)
# gun
Gun DB, ,<a href="#references"><i> see docs below</i></a>
```js
import { uStore } from '@waelio/ustore'
uStore.gun.set('testName', 'test Payload')
uStore.gun.get('testName') === 'test Payload'
```
[Back to TOP](#)
# memory
In memory storage
```js
import { uStore } from '@waelio/ustore'
uStore.memory.set('testName', 'test Payload')
uStore.memory.get('testName') === 'test Payload'
```
[Back to TOP](#)
# config 
## REMOVED temporily

Config is home-brewed solution, more documentations coming soon.
```js
import { uStore } from '@waelio/ustore'
uStore.config.set('client:testName', 'test Payload')
uStore.config.get('client:testName') === 'test Payload'
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