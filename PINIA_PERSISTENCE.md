# Pinia Store Persistence Guide

This project now includes persistent Pinia stores using `pinia-plugin-persistedstate`.

## What's Been Added

### 1. **Persistence Plugin Installation**
```bash
npm install pinia-plugin-persistedstate@^3.2.3 --legacy-peer-deps
```

### 2. **Plugin Configuration** (`src/main.ts`)
```typescript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

## How to Use Persistent Stores

### Simple Persistence
Add `{ persist: true }` as the third parameter to `defineStore`:

```typescript
export const useCounterStore = defineStore('counter', () => {
  // ... your store logic
  return { count, increment, decrement }
}, {
  persist: true // This makes the entire store persistent
})
```

### Advanced Persistence Configuration
```typescript
export const useUserStore = defineStore('user', () => {
  // ... your store logic
}, {
  persist: {
    // Only persist specific fields
    paths: ['name', 'email', 'preferences'],
    
    // Use sessionStorage instead of localStorage
    storage: sessionStorage,
    
    // Custom key name (default is the store id)
    key: 'my-user-data',
    
    // Custom serializer
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  }
})
```

## Storage Options

- **localStorage** (default): Data persists until manually cleared
- **sessionStorage**: Data persists until the browser tab is closed
- **Custom storage**: You can implement your own storage solution

## Examples in This Project

1. **Counter Store** (`src/stores/counter.ts`): 
   - Simple persistence with localStorage
   - Entire store state is saved

2. **User Store** (`src/stores/user.ts`):
   - Advanced configuration with sessionStorage
   - Only specific fields are persisted
   - Custom serialization options

## Testing Persistence

1. Start the development server: `npm run dev`
2. Navigate to the home page
3. Increment the counter or interact with stores
4. Refresh the page - your data should persist!
5. Check browser DevTools > Application > Local Storage to see stored data

## Benefits

- **Automatic**: No manual localStorage/sessionStorage handling
- **Type-safe**: Full TypeScript support
- **Flexible**: Configure exactly what and how to persist
- **SSR-friendly**: Works with server-side rendering
- **Performance**: Only saves data when it actually changes

## Browser Support

The persistence plugin works in all modern browsers that support:
- localStorage (for default storage)
- sessionStorage (when configured)
- JSON.stringify/parse (for serialization)
