import React from 'react'
import * as d3 from 'd3'

import { AxisBottom } from '../components/AxisBottom'
import { AxisLeft } from '../components/AxisLeft'
import { Marks } from '../components/Marks'

//Need to get the covid cases data, from minValue and maxValue?
//Overlay it with a line graph on top of the bars

const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 45, left: 50 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const VaccinationsWithOverlay = ({
  vaccinationsData,
  ordersData,
  casesData,
}) => {
  //Null check for data hooks
  if (!vaccinationsData || !ordersData || !casesData) {
    return <pre>Loading...</pre>
  }

  console.log(casesData)

  const maxValue = new Date(d3.max(vaccinationsData, (d) => d.vaccinationDate))
  const minValue = new Date(d3.min(vaccinationsData, (d) => d.vaccinationDate))
  const getDaysArray = (start, end) => {
    let arr = []
    for (const i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
      arr.push(new Date(i))
    }
    return arr
  }
  const threshold = getDaysArray(minValue, maxValue)

  const bin1 = d3
    .bin()
    .value((d) => d.vaccinationDate)
    .domain([minValue, maxValue])
    .thresholds(threshold)

  const buckets1 = bin1(vaccinationsData)

  const xScale = d3
    .scaleTime()
    .domain([minValue, maxValue])
    .range([0, innerWidth])

  const yValue = (d) => d.length

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(buckets1, yValue), 0])
    .range([0, innerHeight])
    .nice()
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={buckets1}
          yScale={yScale}
          xScale={xScale}
          yValue={yValue}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  )
}

export default VaccinationsWithOverlay
