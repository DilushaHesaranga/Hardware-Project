import './App.css'
import NavigationBar from './components/NavigationBar.jsx'
import DashboardHeader from './components/DashboardHeader.jsx'
import SampleDataNotice from './components/SampleDataNotice.jsx'
import SensorCard from './components/SensorCard.jsx'
import GardenIllustration from './components/GardenIllustration.jsx'

function App() {

  return (
    <>
      <NavigationBar />
      <DashboardHeader
        isConnected={true}
        lastReadingText="Last reading received 14:32:08 (12 s ago)"
      />

      <SampleDataNotice/>
        <main className="dashboard-content">
          <section className="latest-readings" aria-labelledby="latest-readings-title">
            <h2 id="latest-readings-title">Latest readings</h2>

            <div className="sensor-grid">
              <SensorCard
                label="Air temperature"
                value={27.4}
                unit="°C"
                updatedText="Updated 12 s ago"
                status="fresh"
              />
              <SensorCard
                label="Air humidity"
                value={63}
                unit="%"
                updatedText="Updated 12 s ago"
                status="fresh"
              />
              <SensorCard
                label="Nutrient solution EC"
                value={1.6}
                unit="mS/cm"
                updatedText="Updated 12 s ago"
                status="fresh"
              />
              <SensorCard
                label="Water tank level"
                value={7.5}
                unit="L"
                updatedText="Updated 12 s ago"
                status="fresh"
              />
              <SensorCard
                label="Light level"
                value={18400}
                unit="lux"
                updatedText="Updated 14 min ago"
                status="stale"
              />
            </div>
          </section>
          <section className="garden-overview" aria-labelledby="garden-title">
            <h2 id="garden-title">Your garden</h2>
            <GardenIllustration
              frontHeight={200}
              backHeight={183}
            />
          </section>
        </main>
       </>
  )
}

export default App
