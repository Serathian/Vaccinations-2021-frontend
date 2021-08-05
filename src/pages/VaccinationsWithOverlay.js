import './VaccinationsWithOverlay.css'
import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import _ from 'lodash'

import { AxisBottom } from '../components/AxisBottom'
import { AxisLeft } from '../components/AxisLeft'
import { Marks } from '../components/Marks'
import { Lines } from '../components/Lines'

import { getDaysArray, getYScaleDomain } from '../utils/graph-helpers'

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
  const [extendedView, setExtendedView] = useState(7)
  const [dateValueMax, setDateValueMax] = useState(new Date())
  const [dateValueMin, setDateValueMin] = useState(new Date())

  const [vaccinationsFilter, setVaccinationsFilter] = useState('')
  const [casesFilter, setCasesFilter] = useState('All areas')

  useEffect(() => {
    if (vaccinationsData) {
      setDateValueMin(
        new Date(d3.min(vaccinationsData, (d) => d.vaccinationDate))
      )
      const tempXValue = new Date(
        d3.max(vaccinationsData, (d) => d.vaccinationDate)
      )
      setDateValueMax(tempXValue.setDate(tempXValue.getDate() + extendedView))
    }
  }, [extendedView, vaccinationsData])

  //Null check data is received
  if (!vaccinationsData || !ordersData || !casesData) {
    return <pre>Loading...</pre>
  }

  //#region Data Parsing Logic
  const filteredVaccinationsData = !vaccinationsFilter
    ? vaccinationsData
    : vaccinationsData.filter(
        (obj) => obj.sourceBottle.healthCareDistrict === vaccinationsFilter
      )

  console.log(filteredVaccinationsData[0])
  const filteredCasesData = casesData.filter(
    (obj) =>
      obj.Area === casesFilter &&
      obj.Time > dateValueMin &&
      obj.Time < dateValueMax
  )

  //-- Getting thresholds for the binning
  const threshold = getDaysArray(dateValueMin, dateValueMax)

  const vaccinationBuckets = d3
    .bin()
    .value((d) => d.vaccinationDate)
    .domain([dateValueMin, dateValueMax])
    .thresholds(threshold)(filteredVaccinationsData)
  //#endregion

  //#region Visualization Logic
  //-- xAxis values
  const xValueCases = (d) => d.Time

  const xScale = d3
    .scaleTime()
    .domain([dateValueMin, dateValueMax])
    .range([0, innerWidth])

  //-- yAxis Values
  const yValueVaccine = (d) => d.length
  const yValueCases = (d) => d.val

  const yScaleDomain = getYScaleDomain(
    vaccinationBuckets,
    filteredCasesData,
    yValueVaccine,
    yValueCases
  )

  const yScale = d3
    .scaleLinear()
    .domain([yScaleDomain, 0])
    .range([0, innerHeight])
    .nice()

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <Marks
          data={vaccinationBuckets}
          yScale={yScale}
          xScale={xScale}
          yValue={yValueVaccine}
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
