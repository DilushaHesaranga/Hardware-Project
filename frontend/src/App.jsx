import './App.css'
import { useEffect, useState } from 'react'
import ControlsPage from './components/ControlsPage.jsx'
import HistoryPage from './components/HistoryPage.jsx'
import ActivityPage from './components/ActivityPage.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import { sampleReadings, sampleEvents, sensors } from './data/sampleData.js'
import NavigationBar from './components/NavigationBar.jsx'
import DashboardHeader from './components/DashboardHeader.jsx'
import SampleDataNotice from './components/SampleDataNotice.jsx'
import SensorCard from './components/SensorCard.jsx'
import GardenIllustration from './components/GardenIllustration.jsx'

function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'overview');
  const [events, setEvents] = useState(sampleEvents);
  const [settings, setSettings] = useState(() => {
    const defaults = { gardenName: 'Balcony Mint Garden', historySensor: 'temperature' };
    try {
      const saved = JSON.parse(localStorage.getItem('mint-garden-preferences'));
      if (!saved) return defaults;
      return {
        gardenName: typeof saved.gardenName === 'string' && saved.gardenName.trim() ? saved.gardenName.trim().slice(0, 60) : defaults.gardenName,
        historySensor: sensors.some((sensor) => sensor.id === saved.historySensor) ? saved.historySensor : defaults.historySensor
      };
    } catch {
      return defaults;
    }
  });

  function saveSettings(preferences) {
    try {
      localStorage.setItem('mint-garden-preferences', JSON.stringify(preferences));
      setSettings(preferences);
      return true;
    } catch {
      return false;
    }
  }

  function recordRequest(system, action) {
    const event = {
      id: crypto.randomUUID(),
      recordedAt: new Date().toISOString(),
      system,
      status: 'pending',
      message: `Demo: ${action} requested. No command sent; no controller confirmation received.`
    };
    setEvents((previous) => [event, ...previous]);
  }

  useEffect(() => {
    const updatePage = () => setPage(window.location.hash.slice(1) || 'overview');
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  return (
    <>
      <NavigationBar page={page} />
      {page === 'overview' && <>
      <DashboardHeader
        gardenName={settings.gardenName}
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
      </>}
      <div hidden={page !== 'controls'}>
        <ControlsPage onRequest={recordRequest} />
      </div>
      {page === 'history' && <HistoryPage readings={sampleReadings} defaultSensor={settings.historySensor} />}
      {page === 'activity' && <ActivityPage events={events} />}
      {page === 'settings' && <SettingsPage settings={settings} onSave={saveSettings} />}
      {!['overview', 'controls', 'history', 'activity', 'settings'].includes(page) && (
        <main className="coming-soon">
          <h1>Page not found</h1>
          <p><a href="#overview">Return to Overview</a></p>
        </main>
      )}
       </>
  )
}

export default App
