import React from 'react'

const ProcessedLocally = ({ vaccinationsData, ordersData }) => {
  if (!vaccinationsData || !ordersData) {
    return <pre>Filtering...</pre>
  }

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
    <div style={{ margin: '20px' }}>
      <h2>This data is processed in browser</h2>

      <div>Vaccines used thus far: {vaccinationsData.length}</div>
      <div>
        <div>Total orders made thus far: {ordersData.length}</div>
        <div>By producer;</div>
        <ul>
          <li>Antiqua: {totalVaccines.antiqua.orders}</li>
          <li>SolarBuddhica: {totalVaccines.solarBuddhica.orders}</li>
          <li>Zerpfy: {totalVaccines.zerpfy.orders}</li>
        </ul>
      </div>
      <div>
        <div>
          Total bottles ordered thus far: {totalVaccines.total.vaccines}
        </div>
        <div>By producer;</div>
        <ul>
          <li>Antiqua: {totalVaccines.antiqua.vaccines}</li>
          <li>SolarBuddhica: {totalVaccines.solarBuddhica.vaccines}</li>
          <li>Zerpfy: {totalVaccines.zerpfy.vaccines}</li>
        </ul>
      </div>
    </div>
  )
}

export default ProcessedLocally
