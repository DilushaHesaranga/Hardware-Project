import './App.css'
import NavigationBar from './components/NavigationBar.jsx'
import DashboardHeader from './components/DashboardHeader.jsx'
import SampleDataNotice from './components/SampleDataNotice.jsx'
function App() {

  return (
    <>
      <NavigationBar />
      <DashboardHeader
        isConnected={true}
        lastReadingText="Last reading received 14:32:08 (12 s ago)"
      />

      <SampleDataNotice/>
    </>
  )
}

export default App
