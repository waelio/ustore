# GitHub Copilot Instructions for @waelio/ustore

## Project Architecture

**uStore** is a universal storage abstraction library that provides a unified API across 11+ storage backends (localStorage, cookies, Vuex, Pinia, Gun DB, memory, etc.). The core pattern is:

- **Unified Interface**: All storage adapters implement `UStoreClass`/`UStoreClassFunc` with consistent `get`, `set`, `has`, `remove` methods
- **Dual API**: Each storage type exports both `storageType` and is accessible via `uStore.storageType`
- **SSR-Safe**: Cookie and localStorage adapters fall back to in-memory storage when `window` is undefined
- **Vue Integration**: Uses Vue 3 reactivity (`ref`, `computed`) in the core reactive system

## Key Patterns

### Storage Adapter Structure

All adapters in `src/_stores/` follow this pattern:

```typescript
export const exampleStorage: UStoreClass = {
  get: (key: string) => {
    /* implementation */
  },
  getItem: (key: string) => {
    /* alias for get */
  },
  set: (key: string, value: unknown) => {
    /* implementation */
  },
  setItem: (key: string, value: unknown) => {
    /* alias for set */
  },
  has: (key: string) => {
    /* boolean check */
  },
  hasItem: (key: string) => {
    /* alias for has */
  },
  remove: (key: string) => {
    /* deletion */
  },
  removeItem: (key: string) => {
    /* alias for remove */
  },
};
```

### Error Handling Convention

Wrap all operations in try-catch blocks with descriptive console.error messages:

```typescript
get: (key: string) => {
  try {
    return actual_implementation(key);
  } catch (error) {
    console.error("Error in get method:", error);
    return null; // or appropriate fallback
  }
};
```

### Nested Key Support

The `UCORE` class supports colon-separated nested keys (`"parent:child"`) but only one level deep. This is used by memory and config storage.

## Development Workflow

### Build System

- **Multi-format**: Builds ESM (`lib/esm/`), CJS (`lib/cjs/`), and UMD (`lib/umd/`) simultaneously
- **Key Commands**:
  - `pnpm build` - Full build pipeline (cleanup → compile → format → lint)
  - `pnpm test` - Jest tests with jsdom environment
  - Individual builds: `build:esm`, `build:cjs`, `build:umd`

### Testing

- Tests in `__tests__/` follow naming pattern `N.StorageType.test.ts`
- Each test file tests both `uStore.storageType` and direct `storageTypeStorage` imports
- Use `beforeEach` to clean up test data between tests
- Jest config in `jestconfig.json` uses jsdom for browser API simulation

### Type System

- Main types in `src/types.ts` define the storage interfaces
- TypeScript builds with declaration files to `types/` directory
- Dual type exports: `UStoreClass` (minimal) and `UStoreClassFunc` (full API)

## Critical Implementation Details

### SSR Compatibility

When adding browser-specific storage, always check `typeof window !== "undefined"` and provide memory fallback:

```typescript
const isReady = typeof window !== "undefined";
if (!isReady) {
  return memoryStore[key] ?? fallback;
}
```

### Global Exposure

The library auto-exposes `uStore` to `window.uStore` (browser) or `globalThis.uStore` (Node.js).

### Module Aliases

Package.json defines path aliases (`@src`, `@config`, `@depo`) - respect these when adding imports.

### State Management Integration

- Vuex/Pinia adapters handle state management store instances
- Gun DB adapter integrates with Gun's decentralized database
- Signal storage provides basic reactive state without external dependencies

## Common Tasks

### Adding New Storage Type

1. Create `src/_stores/newStorage.ts` implementing `UStoreClass`
2. Add import/export to `src/index.ts`
3. Add type definitions to main type union
4. Create test file `__tests__/N.NewStorage.test.ts`
5. Update README examples

### Debugging Storage Issues

- Check browser/Node.js environment compatibility
- Verify error handling catches all failure modes
- Test both direct import and `uStore.` access patterns
- Ensure proper cleanup in remove methods
