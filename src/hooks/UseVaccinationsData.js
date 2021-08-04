import { useEffect, useState } from 'react'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'
import { setup } from 'axios-cache-adapter'

const configure = async () => {
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
    name: 'vaccinations',
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

export const UseVaccinationsData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    configure().then(async (api) => {
      const response = await api.get('/vaccinations')
      const data = response.data

      const formattedData = data.map((obj) => ({
        ...obj,
        vaccinationDate: new Date(obj.vaccinationDate),
      }))

      setData(formattedData)
    })
  }, [])
  return data
}
