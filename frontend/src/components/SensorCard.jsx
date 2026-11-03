import './SensorCard.css';
import StatusBadge from './StatusBadge.jsx';

function SensorCard({ label, value, unit, updatedText, status }) {
  const hasReading = value !== null && value !== undefined;

  return (
    <article className="sensor-card">
      <h3 className="sensor-card_label">{label}</h3>

      <p className="sensor-card_reading">
        {hasReading ? (
          <>
            <span className="sensor-card_value">{value}</span>
            <span className="sensor-card_unit">{unit}</span>
          </>
        ) : (
          <span className="sensor-card_empty">No reading yet</span>
        )}
      </p>

      <p className="sensor-card_updated">
        {hasReading ? updatedText : 'Waiting for the first reading'}
      </p>
      <StatusBadge status={hasReading ? status : 'missing'} />
    </article>
  )
}

export default SensorCard
