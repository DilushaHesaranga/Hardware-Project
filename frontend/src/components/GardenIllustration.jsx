import './GardenIllustration.css';

function GardenIllustration({ frontHeight, backHeight }) {
  const rows = [90, 150, 210];
  const plants = [90, 150, 210, 270, 330];

  return (
    <figure className="garden-illustration">
      <p className="garden-illustration_roof">
        Roof: {frontHeight} cm front, {backHeight} cm back
      </p>

      <svg
        className="garden-illustration_diagram"
        viewBox="0 36 420 354"
        role="img"
        aria-label="Front view of the hydroponic mint garden: three rows of five plants, with a tank, pump and electronics cabinet below."
      >
        {/*Frame for the three hydroponic growing rows*/}
        <rect x="46" y="54" width="328" height="318" fill="white" stroke="#111111" strokeWidth="10" />

        {rows.map((y) => (
          <g key={y}>
            <line x1="56" y1={y + 17} x2="364" y2={y + 17} stroke="#3c4c43" strokeWidth="9" strokeLinecap="round" />
            {plants.map((x) => (
              <circle key={x} cx={x} cy={y} r="10" fill="#1b7054" />
            ))}
          </g>
        ))}

        {/*Equipment cabinet below the growing rows*/}
        <line x1="51" y1="278" x2="369" y2="278" stroke="#111111" strokeWidth="4" />
        <text x="210" y="334" textAnchor="middle" className="garden-illustration_cabinet">
          Cabinet: tank, pump, electronics
        </text>
      </svg>

      <figcaption className="garden-illustration_caption">
        Front is the viewing side. Sun arrives from the back.
      </figcaption>
    </figure>
  )
}

export default GardenIllustration
