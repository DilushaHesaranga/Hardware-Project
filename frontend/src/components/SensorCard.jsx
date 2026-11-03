function SensorCard({ label, value, unit }) {
  return (
    <article className="sensor-card">
      <h3 className="sensor-card_label">{label}</h3>

      <p className="sensor-card_reading">
        <span className="sensor-card_value">{value}</span>
        <span className="sensor-card_unit">{unit}</span>
      </p>
    </article>
  )
}

export default SensorCard