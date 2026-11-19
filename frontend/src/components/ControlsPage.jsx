import { useState } from 'react';
import './ControlsPage.css';

function ControlsPage({ onRequest }) {
  const [requests, setRequests] = useState({});
  const systems = [
    { id: 'shade', name: 'Sunlight shade', description: 'Adjust the shade on the sunny side of the garden.', actions: ['Deploy', 'Retract', 'Stop'] },
    { id: 'cover', name: 'Rain cover', description: 'Cover or uncover the hydroponic growing rows.', actions: ['Deploy', 'Retract', 'Stop'] },
    { id: 'lights', name: 'Artificial lighting', description: 'Switch the supplementary growing lights on or off.', actions: ['On', 'Off'] }
  ];

  function requestAction(id, action) {
    //Sample requests only. Device confirmation must come from the backend later.
    setRequests((previous) => ({ ...previous, [id]: action }));
    const system = systems.find((item) => item.id === id);
    onRequest(system.name, action);
  }

  return (
    <main className="controls-page">
      <header className="controls-page_header">
        <h1>Garden controls</h1>
        <p>Manage the shade, rain cover and artificial lighting.</p>
      </header>

      <p className="controls-page_notice">
        Sample mode: buttons demonstrate command requests only. No commands are sent to hardware.
      </p>

      <section className="controls-page_automation" aria-labelledby="automation-title">
        <div>
          <span className="controls-page_label">AUTOMATED SYSTEM</span>
          <h2 id="automation-title">Hydroponic nutrient management</h2>
          <p>Nutrient circulation and Albert’s Solution dosing are managed together automatically by the controller.</p>
        </div>
        <span className="controls-page_badge">Awaiting controller data</span>
        <p className="controls-page_detail">Live automation status will appear here when connected. No manual circulation or dosing controls are provided.</p>
      </section>

      <h2 className="controls-page_heading">Manual controls</h2>
      <div className="controls-page_grid">
        {systems.map((system) => (
          <article className="control-card" key={system.id}>
            <h3>{system.name}</h3>
            <p className="control-card_description">{system.description}</p>
            <span className="controls-page_badge">Device state unknown</span>
            <div className="control-card_actions">
              {system.actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className={action === 'Stop' ? 'control-card_stop' : ''}
                  disabled={Boolean(requests[system.id]) && (action !== 'Stop' || requests[system.id] === 'Stop')}
                  onClick={() => requestAction(system.id, action)}
                >
                  {action}
                </button>
              ))}
            </div>
            <p className="control-card_request" role="status">
              {requests[system.id]
                ? `Demo: ${requests[system.id]} requested — pending controller confirmation. Nothing was sent.`
                : 'No command requested.'}
            </p>
          </article>
        ))}
      </div>
      <footer className="controls-page_footer">
        <p>A request is only complete after the controller confirms the result.</p>
        <button type="button" onClick={() => setRequests({})}>Reset demo requests</button>
      </footer>
    </main>
  );
}

export default ControlsPage;
