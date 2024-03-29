import { useEffect, useState } from 'react'
import { configure } from '../utils/axios-cache-configure'

export const UseOrdersData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    configure('orders').then(async (api) => {
      const response = await api.get('/orders')
      setData(response.data)
    })
  }, [])
  return data
}
