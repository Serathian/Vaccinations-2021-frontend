import { UseOrdersData } from './hooks/UseOrdersData'
import { UseVaccinationsData } from './hooks/UseVaccinationsData'
import InformationalText from './pages/InformationalText'
import VaccinationsWithOverlay from './pages/VaccinationsWithOverlay'

const App = () => {
  const vaccinationsData = UseVaccinationsData()
  const ordersData = UseOrdersData()

  //Null check for data hooks

  return (
    <div className='App'>
      <VaccinationsWithOverlay
        vaccinationsData={vaccinationsData}
        ordersData={ordersData}
      />
      <InformationalText
        vaccinationsData={vaccinationsData}
        ordersData={ordersData}
      />
    </div>
  )
}

export default App
