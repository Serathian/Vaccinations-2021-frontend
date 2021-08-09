import { useEffect, useState } from 'react'
import { configure } from '../utils/axios-cache-configure'

export const UseVaccinationsData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    configure('vaccinations').then(async (api) => {
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
