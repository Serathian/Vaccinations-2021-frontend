import { useEffect, useState } from 'react'
import { csv } from 'd3'

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
