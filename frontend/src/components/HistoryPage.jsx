import { useState } from 'react';
import { sensors } from '../data/sampleData.js';
import './PageLayout.css';
import './HistoryPage.css';

function HistoryPage({ readings, defaultSensor }) {
  const [sensorId, setSensorId] = useState(defaultSensor);
  const [date, setDate] = useState('2026-11-03');
  const sensor = sensors.find((item) => item.id === sensorId) || sensors[0];
  const filtered = readings.filter((reading) => reading.recordedAt.slice(0, 10) === date && Number.isFinite(reading[sensor.id]));
  const ordered = [...filtered].sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));
  const values = ordered.map((reading) => reading[sensor.id]);
  const minimum = values.length ? Math.min(...values) : 0;
  const maximum = values.length ? Math.max(...values) : 0;
  const range = maximum - minimum || 1;
  const firstTime = ordered.length ? new Date(ordered[0].recordedAt).getTime() : 0;
  const duration = ordered.length ? new Date(ordered[ordered.length - 1].recordedAt).getTime() - firstTime || 1 : 1;
  const points = ordered.map((reading) => ({
    x: 70 + (new Date(reading.recordedAt).getTime() - firstTime) / duration * 670,
    y: 210 - (reading[sensor.id] - minimum) / range * 160
  }));

  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <main className="data-page">
      <header className="data-page_header">
        <h1>Reading history</h1>
        <p>Explore past measurements from your hydroponic garden.</p>
      </header>
      <p className="data-page_notice">Sample records for 2–3 November 2026. All times are shown in Sri Lanka time (UTC+05:30).</p>

      <div className="data-page_filters">
        <label>Measurement
          <select value={sensorId} onChange={(event) => setSensorId(event.target.value)}>
            {sensors.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label>Date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
      </div>

      {ordered.length ? <>
        <section className="data-page_panel history-page_trend" aria-labelledby="trend-title">
          <h2 id="trend-title">{sensor.label} ({sensor.unit})</h2>
          <div className="history-page_summary">
            <p>Lowest <strong>{minimum} {sensor.unit}</strong></p>
            <p>Highest <strong>{maximum} {sensor.unit}</strong></p>
            <p>Records <strong>{ordered.length}</strong></p>
          </div>
          <svg viewBox="0 0 800 260" className="history-page_chart" role="img" aria-label={`${sensor.label} trend for ${date}. Values range from ${minimum} to ${maximum} ${sensor.unit}. Exact readings are in the table below.`}>
            <line x1="70" y1="50" x2="740" y2="50" stroke="#d3dcd6" />
            <line x1="70" y1="210" x2="740" y2="210" stroke="#d3dcd6" />
            <text x="60" y="55" textAnchor="end">{maximum === minimum ? minimum + 1 : maximum}</text>
            <text x="60" y="215" textAnchor="end">{minimum}</text>
            <polyline points={points.map((point) => `${point.x},${point.y}`).join(' ')} fill="none" stroke="#1b7054" strokeWidth="3" />
            {points.map((point, index) => <circle key={ordered[index].recordedAt} cx={point.x} cy={point.y} r="5" fill="#1b7054" />)}
            <text x="70" y="245">{formatTime(ordered[0].recordedAt)}</text>
            {ordered.length > 1 && <text x="740" y="245" textAnchor="end">{formatTime(ordered[ordered.length - 1].recordedAt)}</text>}
          </svg>
        </section>
        <section className="data-page_panel" aria-labelledby="records-title">
          <h2 id="records-title">Recorded readings</h2>
          <div className="history-page_table">
            <table>
              <caption>{sensor.label} on {date} — sample data</caption>
              <thead><tr><th scope="col">Time (Sri Lanka)</th><th scope="col">Value ({sensor.unit})</th></tr></thead>
              <tbody>
                {[...ordered].reverse().map((reading) => (
                  <tr key={reading.recordedAt}><td>{formatTime(reading.recordedAt)}</td><td>{reading[sensor.id]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </> : <div className="data-page_panel data-page_empty" role="status">No readings for this date. Try 2 or 3 November 2026 to explore the sample data.</div>}
    </main>
  );
}

export default HistoryPage;
