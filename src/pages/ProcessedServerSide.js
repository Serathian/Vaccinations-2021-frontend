import React from 'react'

const ProcessedServerSide = ({ data, setDate }) => {
  if (!data) {
    return <div>Fetching data...</div>
  }
  const {
    bottlesExpiringToday,
    bottlesExpiringWithin10Days,
    ordersArrivingToday,
    ordersMade,
    usedVaccines,
    vaccinationsOrdered,
  } = data
  const { Antiqua, SolarBuddhica, Zerpfy } = vaccinationsOrdered
  return (
    <div style={{ margin: '20px' }}>
      <h2>This data is processed server side</h2>

      <div>Vaccines used thus far: {usedVaccines}</div>
      <div>
        <div>Total orders made thus far: {ordersMade}</div>
        <div>By producer;</div>
        <ul>
          <li>Antiqua: {Antiqua}</li>
          <li>SolarBuddhica: {SolarBuddhica}</li>
          <li>Zerpfy: {Zerpfy}</li>
        </ul>
      </div>
      <div>Bottles expiring today: {bottlesExpiringToday}</div>
      <div>
        Bottles expiring within the next 10 days: {bottlesExpiringWithin10Days}
      </div>
      <div>Orders arriving today: {ordersArrivingToday}</div>
    </div>
  )
}

export default ProcessedServerSide
