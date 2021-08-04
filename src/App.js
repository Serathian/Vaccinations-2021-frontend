import { UseOrdersData } from './hooks/UseOrdersData'
import { UseVaccinationsData } from './hooks/UseVaccinationsData'
import VaccinationsWithOverlay from './pages/VaccinationsWithOverlay'

const App = () => {
  const vaccinationsData = UseVaccinationsData()
  const ordersData = UseOrdersData()

  //Null check for data hooks
  if (!vaccinationsData || !ordersData) {
    return <pre>Loading...</pre>
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
    <div className='App'>
      <VaccinationsWithOverlay
        vaccinationsData={vaccinationsData}
        ordersData={ordersData}
      />
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
