import { useEffect, useState } from 'react'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'
import { setup } from 'axios-cache-adapter'
import { csv } from 'd3'

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
    name: 'cases',
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

const csvUrl =
  'https://gist.githubusercontent.com/Serathian/86c591b116df5efe282a8350f4685e61/raw/938ea4e230d56faa68b94fd5a3cc35ee4881b79f/'
export const UseCasesData = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const row = (d) => {
      d.Time = new Date(d.Time)
      d.val = +d.val
      return d
    }
    csv(csvUrl, row).then(setData)
  }, [])
  return data
}

// useEffect(() => {
//   configure().then(async (api) => {
//     const response = await api.get('/cases')
//     const data = response.data

//     setData(data)
//   })
// }, [])
