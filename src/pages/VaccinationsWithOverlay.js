import './VaccinationsWithOverlay.css'
import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'

import { AxisBottom } from '../components/AxisBottom'
import { AxisLeft } from '../components/AxisLeft'
import { Marks } from '../components/Marks'
import { Lines } from '../components/Lines'

import { getDaysArray, getYScaleDomain } from '../utils/graph-helpers'

//TODO: Add filtering drop down boxes

//Variables for the dimensions of the graph
const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 45, left: 50 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const VaccinationsWithOverlay = ({ vaccinationsData, casesData }) => {
  const [extendedView, setExtendedView] = useState(false)
  const handleExtendedView = () => {
    setExtendedView(!extendedView)
  }

  const [dateValueMax, setDateValueMax] = useState(new Date())
  const [dateValueExtended, setDateValueExtended] = useState(new Date())
  const [dateValueMin, setDateValueMin] = useState(new Date())

  const [filterSelector, setFilterSelector] = useState(0)
  const vaccinationsFilterOptions = ['', 'HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS']
  const [vaccinationsFilter, setVaccinationsFilter] = useState(
    vaccinationsFilterOptions[0]
  )
  const casesFilterOptions = [
    'All areas',
    'Helsinki and Uusimaa Hospital District',
    'North Savo Hospital District',
    'North Ostrobothnia Hospital District',
    'Pirkanmaa Hospital District',
    'Southwest Finland Hospital District',
  ]
  const [casesFilter, setCasesFilter] = useState(casesFilterOptions[0])

  const handleSelectorChange = (e) => {
    const index = e.target.value
    setFilterSelector(index)
    setVaccinationsFilter(vaccinationsFilterOptions[index])
    setCasesFilter(casesFilterOptions[index])
  }

  useEffect(() => {
    if (vaccinationsData) {
      setDateValueMin(
        new Date(d3.min(vaccinationsData, (d) => d.vaccinationDate))
      )
      setDateValueMax(
        new Date(d3.max(vaccinationsData, (d) => d.vaccinationDate))
      )
    }
  }, [vaccinationsData])

  useEffect(() => {
    if (extendedView) {
      setDateValueExtended(
        new Date(dateValueMax).setDate(dateValueMax.getDate() + 15)
      )
    }
    if (!extendedView) {
      setDateValueExtended(
        new Date(dateValueMax).setDate(dateValueMax.getDate())
      )
    }
  }, [dateValueMax, extendedView])

  //Null check data is received
  if (!vaccinationsData || !casesData) {
    return <pre>Loading Data...</pre>
  }

  //#region Data Parsing Logic

  //-- Data filtering
  const filteredVaccinationsData = !vaccinationsFilter
    ? vaccinationsData
    : vaccinationsData.filter(
        (obj) => obj.sourceBottle.healthCareDistrict === vaccinationsFilter
      )

  const filteredCasesData = casesData.filter(
    (obj) =>
      obj.Area === casesFilter &&
      obj.Time > dateValueMin &&
      obj.Time < dateValueExtended
  )

  //-- Getting thresholds for the binning
  const threshold = getDaysArray(dateValueMin, dateValueMax)

  const vaccinationBuckets = d3
    .bin()
    .value((d) => d.vaccinationDate)
    .domain([dateValueMin, dateValueMax])
    .thresholds(threshold)(filteredVaccinationsData)
  //#endregion

  //Null check if data if parsing
  if (!filteredVaccinationsData || !filteredCasesData || !vaccinationBuckets) {
    return <pre>Parsing Data...</pre>
  }

  //#region Visualization Logic
  //-- xAxis values
  const xValueCases = (d) => d.Time

  const xScale = d3
    .scaleTime()
    .domain([dateValueMin, dateValueExtended])
    .range([0, innerWidth])
    .nice()

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
  //#endregion

  return (
    <div id='graph'>
      <h1>Correlation of COVID-19 vaccinations and Reported cases</h1>
      <h5>
        This is a graphical representation of COVID-19 vaccinations (Source:
        {
          <a href='https://github.com/solita/vaccine-exercise-2021'>
            Solita Exercise Git Repo
          </a>
        }
        ) compared with Daily reported COVID-19 cases (Source:{' '}
        {
          <a href='https://sampo.thl.fi/pivot/prod/en/epirapo/covid19case'>
            sampo.thl.fi
          </a>
        }
        )
      </h5>
      <ul>
        <li>
          <strong>Area</strong> - The provence displayed
        </li>
        <li>
          <strong>Extended View</strong> - Toggle drop-off period (2 weeks / 15
          days)
        </li>
      </ul>
      <label>
        Area:
        <select
          id='area'
          value={filterSelector}
          onChange={(e) => handleSelectorChange(e)}>
          <option value={0}>All Areas</option>
          <option value={1}>Uusimaa</option>
          <option value={2}>North Savo</option>
          <option value={3}>North Ostrobothnia</option>
          <option value={4}>Pirkanmaa</option>
          <option value={5}>Southwest Finland</option>
        </select>
      </label>
      <label>
        Extended View:
        <button id='extended-view' onClick={handleExtendedView}>
          {extendedView ? 'Hide' : 'Show'}
        </button>
      </label>
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
    </div>
  )
}

export default VaccinationsWithOverlay
