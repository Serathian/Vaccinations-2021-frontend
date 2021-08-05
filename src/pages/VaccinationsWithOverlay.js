import './VaccinationsWithOverlay.css'
import React, { useState } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

import { AxisBottom } from '../components/AxisBottom'
import { AxisLeft } from '../components/AxisLeft'
import { Marks } from '../components/Marks'
import { Lines } from '../components/Lines'

//Need to get the covid cases data, from minValue and maxValue?
//Overlay it with a line graph on top of the bars

//TODO: Add filtering and clean code


//Variables for the dimensions of the graph 
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
  //Extended view extends the graph to view the effects of the vaccines after data finishes.
  const [extendedView, setExtendedView] = useState(14)

  //Null check for data
  if (!vaccinationsData || !ordersData || !casesData) {
    return <pre>Loading...</pre>
  }


  const maxValue = new Date(d3.max(vaccinationsData, (d) => d.vaccinationDate))
  maxValue.setDate(maxValue.getDate() + extendedView)

  const minValue = new Date(d3.min(vaccinationsData, (d) => d.vaccinationDate))

  const filteredCasesData = casesData.filter(
    (obj) =>
      obj.Area === 'All areas' && obj.Time > minValue && obj.Time < maxValue
  )

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
  const yValueCases = (d) => d.val

  const xValueCases = (d) => d.Time

  const yScaleDomain = () => {
    const vaccineMax = d3.max(buckets1, yValue)
    const casesMax = d3.max(filteredCasesData, yValueCases)

    console.log(vaccineMax, casesMax)
    return vaccineMax > casesMax ? vaccineMax : casesMax
  }

  const yScale = d3
    .scaleLinear()
    .domain([yScaleDomain(), 0])
    .range([0, innerHeight])
    .nice()

  //TODO: I should get new data from the backend of all dates,
  /* filter the data by the dates i have in the chart,
    To make it easier i should format the data on the backend
    so it is in objects of 'region':[{date:'2021-01-21', value:'324'}] */

  console.log(filteredCasesData[0])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <Marks
          data={buckets1}
          yScale={yScale}
          xScale={xScale}
          yValue={yValue}
          innerHeight={innerHeight}
        />
        <Lines
          data={filteredCasesData}
          yScale={yScale}
          xScale={xScale}
          yValue={yValueCases}
          xValue={xValueCases}
        />
      </g>
    </svg>
  )
}

export default VaccinationsWithOverlay
