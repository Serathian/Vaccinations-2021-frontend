import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'
import { setup } from 'axios-cache-adapter'

export const configure = async (name) => {
  // Register the custom `memoryDriver` to `localforage`
  await localforage.defineDriver(memoryDriver)

  // Create `localforage` instance
  const forageStore = localforage.createInstance({
    // List of drivers used
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
      memoryDriver._driver,
    ],
    // Prefix all storage keys to prevent conflicts
    name: name,
  })

  // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
  return setup({
    // `axios` options
    baseURL: 'http://localhost:4000/api',

    // `axios-cache-adapter` options
    cache: {
      maxAge: 15 * 60 * 1000,
      store: forageStore, // Pass `localforage` store to `axios-cache-adapter`
    },
  })
}
