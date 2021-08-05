import React from 'react'

const InformationalText = ({ vaccinationsData, ordersData }) => {
  if (!vaccinationsData || !ordersData) {
    return <pre>Loading...</pre>
  }

  //TODO: Iterate through vaccines and count how many have been used per order.
  /* !!This should be done on the backend?!!
  If this was a database, each order would get a count when vaccines are entered
  into the system. Maybe keep this data processing on the frontend to show
  balanced skills.
  This could be done by going through each vaccine, finding the order
  and adding a counter and a boolean to the order. then we can filter by the boolean
  to sum how many are left unused. */

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
    <div>
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
    </div>
  )
}

export default InformationalText
