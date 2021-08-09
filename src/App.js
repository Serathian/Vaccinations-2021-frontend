import { UseCasesData } from './hooks/UseCasesData'
import { UseOrdersData } from './hooks/UseOrdersData'
import { UseVaccinationsData } from './hooks/UseVaccinationsData'
import ProcessedLocally from './pages/ProcessedLocally'
import VaccinationsWithOverlay from './pages/VaccinationsWithOverlay'
import ProcessedServerSide from './pages/ProcessedServerSide'
import { UseServerData } from './hooks/UseServerData'
import { useState } from 'react'

import DatePicker from 'react-date-picker'

const App = () => {
  const [date, setDate] = useState(new Date())
  const vaccinationsData = UseVaccinationsData()
  const ordersData = UseOrdersData()
  const casesData = UseCasesData()
  const serverData = UseServerData(date)
  console.log(date)

  if (!ordersData || !vaccinationsData) {
    return <div>Fetching data...</div>
  }
  const filteredOrders = ordersData.filter(
    (obj) => new Date(obj.arrived) <= date
  )
  const filteredVaccinations = vaccinationsData.filter(
    (obj) => obj.vaccinationDate <= date
  )

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <VaccinationsWithOverlay
        vaccinationsData={filteredVaccinations}
        casesData={casesData}
      />
      <label>
        Change date:
        <DatePicker onChange={setDate} value={date} />
      </label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ProcessedLocally
          vaccinationsData={filteredVaccinations}
          ordersData={filteredOrders}
        />
        <ProcessedServerSide data={serverData} setDate={setDate} />
      </div>
    </div>
  )
}

export default App
