import { UseCasesData } from './hooks/UseCasesData'
import { UseOrdersData } from './hooks/UseOrdersData'
import { UseVaccinationsData } from './hooks/UseVaccinationsData'
import InformationalText from './pages/InformationalText'
import VaccinationsWithOverlay from './pages/VaccinationsWithOverlay'

const App = () => {
  const vaccinationsData = UseVaccinationsData()
  const ordersData = UseOrdersData()
  const casesData = UseCasesData()

  return (
    <div className='App'>
      <VaccinationsWithOverlay
        vaccinationsData={vaccinationsData}
        casesData={casesData}
      />
      <InformationalText
        vaccinationsData={vaccinationsData}
        ordersData={ordersData}
      />
    </div>
  )
}

export default App
