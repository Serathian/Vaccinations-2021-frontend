import { useEffect, useState } from 'react'
import { configure } from '../utils/axios-cache-configure'

export const UseServerData = (date) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    configure('data').then(async (api) => {
      const response = await api.get(`/data/${date.toISOString()}`)
      setData(response.data)
    })
  }, [date])
  return data
}
