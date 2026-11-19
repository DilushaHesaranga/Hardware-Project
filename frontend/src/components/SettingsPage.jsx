import { useState } from 'react';
import { sensors } from '../data/sampleData.js';
import './PageLayout.css';
import './SettingsPage.css';

function SettingsPage({ settings, onSave }) {
  const [gardenName, setGardenName] = useState(settings.gardenName);
  const [historySensor, setHistorySensor] = useState(settings.historySensor);
  const [message, setMessage] = useState('');

  function saveSettings(event) {
    event.preventDefault();
    if (!gardenName.trim()) {
      setMessage('Please enter a garden name.');
      return;
    }
    const saved = onSave({ gardenName: gardenName.trim(), historySensor });
    setMessage(saved ? 'Preferences saved in this browser.' : 'Could not save preferences. Browser storage may be unavailable.');
  }

  function discardChanges() {
    setGardenName(settings.gardenName);
    setHistorySensor(settings.historySensor);
    setMessage('Unsaved changes discarded.');
  }

  return (
    <main className="data-page">
      <header className="data-page_header">
        <h1>Garden settings</h1>
        <p>Personalise your dashboard and review the garden setup.</p>
      </header>
      <p className="data-page_notice">Preferences are saved only in this browser. Hardware configuration and live data are not connected yet.</p>
      <div className="settings-page_grid">
        <form className="data-page_panel settings-page_form" onSubmit={saveSettings}>
          <h2>Dashboard preferences</h2>
          <label>Garden name
            <input required maxLength={60} value={gardenName} onChange={(event) => { setGardenName(event.target.value); setMessage(''); }} />
          </label>
          <label>Default history measurement
            <select value={historySensor} onChange={(event) => { setHistorySensor(event.target.value); setMessage(''); }}>
              {sensors.map((sensor) => <option key={sensor.id} value={sensor.id}>{sensor.label}</option>)}
            </select>
          </label>
          <p className="settings-page_help">Used when you next open History. The garden name appears on Overview.</p>
          <div className="settings-page_actions">
            <button type="submit">Save preferences</button>
            <button type="button" onClick={discardChanges}>Discard changes</button>
          </div>
          <p role="status">{message}</p>
        </form>
        <section className="data-page_panel" aria-labelledby="setup-title">
          <h2 id="setup-title">Garden setup</h2>
          <dl className="settings-page_details">
            <div><dt>Growing method</dt><dd>Hydroponics</dd></div>
            <div><dt>Plants</dt><dd>15 mint plants · 3 rows of 5</dd></div>
            <div><dt>Nutrient solution</dt><dd>Albert’s Solution</dd></div>
            <div><dt>Nutrient management</dt><dd>Automated circulation and dosing</dd></div>
            <div><dt>Time zone</dt><dd>Asia/Colombo (UTC+05:30)</dd></div>
            <div><dt>Data source</dt><dd>Sample data</dd></div>
          </dl>
          <p className="settings-page_help">Automation thresholds, schedules and device settings will be configured after the controller and nutrient system are confirmed.</p>
        </section>
        <section className="data-page_panel settings-page_sensors" aria-labelledby="sensors-title">
          <h2 id="sensors-title">Planned measurements</h2>
          <ul>{sensors.map((sensor) => <li key={sensor.id}>{sensor.label} <span>{sensor.unit}</span></li>)}</ul>
          <p className="settings-page_help">Units are for the sample interface. Tank volume in litres will need sensor calibration.</p>
        </section>
      </div>
    </main>
  );
}

export default SettingsPage;
