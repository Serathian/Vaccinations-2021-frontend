import { useEffect, useState } from 'react'
import { UseOrdersData } from './hooks/UseOrdersData'
import { UseVaccinationsData } from './hooks/UseVaccinationsData'
import * as d3 from 'd3'
import _ from 'lodash'
import { AxisBottom } from './components/AxisBottom'
import { AxisLeft } from './components/AxisLeft'
import { Marks } from './components/Marks'

//Need to get the covid cases data, from minValue and maxValue?
//Overlay it with a line graph on top of the bars

const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 45, left: 50 }

const App = () => {
  const vaccinationsData = UseVaccinationsData()
  const ordersData = UseOrdersData()

  //Null check for data hooks
  if (!vaccinationsData || !ordersData) {
    return <pre>Loading...</pre>
  }

  //d3.bin tests
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const maxValue = new Date(d3.max(vaccinationsData, (d) => d.vaccinationDate))
  const minValue = new Date(d3.min(vaccinationsData, (d) => d.vaccinationDate))

  const xScale = d3
    .scaleTime()
    .domain([minValue, maxValue])
    .range([0, innerWidth])

  //xScale.ticks(d3.timeDay) gives me all the ticks between min and max values
  //But the binning is not recognizing them, I wrote a function to create an array of dates. This seems to work.

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

  const yValue = (d) => d.length

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(buckets1, yValue), 0])
    .range([0, innerHeight])
    .nice()

  const getTotalVaccines = () => {
    let antiqua = { orders: 0, vaccines: 0 }
    let solarBuddhica = { orders: 0, vaccines: 0 }
    let zerpfy = { orders: 0, vaccines: 0 }

    ordersData.forEach((order) => {
      switch (order.vaccine) {
        case 'Antiqua':
          antiqua.orders++
          antiqua.vaccines += order.injections
          break
        case 'SolarBuddhica':
          solarBuddhica.orders++
          solarBuddhica.vaccines += order.injections
          break
        case 'Zerpfy':
          zerpfy.orders++
          zerpfy.vaccines += order.injections
          break
        default:
          break
      }
    })

    let total = {
      orders: antiqua.orders + solarBuddhica.orders + zerpfy.orders,
      vaccines: antiqua.vaccines + solarBuddhica.vaccines + zerpfy.vaccines,
    }

    return { antiqua, solarBuddhica, zerpfy, total }
  }
  const totalVaccines = getTotalVaccines()

  return (
    <div className='App'>
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
      <div>Total Vaccinations Given: {vaccinationsData.length}</div>
      <div>Total Orders Made: {ordersData.length}</div>
      <div>Total Vaccines Ordered: {totalVaccines.total.vaccines}</div>
      <div>
        Antiqua has {totalVaccines.antiqua.orders} Orders and a total of{' '}
        {totalVaccines.antiqua.vaccines} vaccines purchased
      </div>
      <div>
        SolarBuddhica has {totalVaccines.solarBuddhica.orders} Orders and a
        total of {totalVaccines.solarBuddhica.vaccines} vaccines purchased
      </div>
      <div>
        Zerpfy has {totalVaccines.zerpfy.orders} Orders and a total of{' '}
        {totalVaccines.zerpfy.vaccines} vaccines purchased
      </div>
      {/* {formattedData.map((v, i) => (
        <div style={{ border: '2px solid red' }} key={v.id}>
          <div>INDEX: {i}</div>
          <div>ID: {v.id}</div>
          <div>DATE: {v.vaccinationDate}</div>
          <div>GENDER: {v.gender}</div>
          <div>DISTRICT: {v.sourceBottle.healthCareDistrict}</div>
          <div>ARRIVED: {v.sourceBottle.arrived}</div>
          <div>AMOUNT: {v.sourceBottle.injections}</div>
          <div>SOURCE-ID: {v.sourceBottle.id}</div>
        </div>
      ))} */}
    </div>
  )
}

export default App
