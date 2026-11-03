import { useState } from 'react';
import './PageLayout.css';
import './ActivityPage.css';

function ActivityPage({ events }) {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const labels = { info: 'Information', warning: 'Warning', pending: 'Pending confirmation' };
  const filtered = events.filter((event) => (
    (status === 'all' || event.status === status) &&
    `${event.system} ${event.message}`.toLowerCase().includes(search.trim().toLowerCase())
  )).sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

  return (
    <main className="data-page">
      <header className="data-page_header">
        <h1>Garden activity</h1>
        <p>Review controller events, alerts and command requests.</p>
      </header>
      <p className="data-page_notice">Sample events and demo requests only. Demo requests are kept for this browser session until refresh; they are never sent to hardware.</p>
      <div className="data-page_filters">
        <label>Event status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All events</option>
            <option value="info">Information</option>
            <option value="warning">Warnings</option>
            <option value="pending">Pending confirmation</option>
          </select>
        </label>
        <label>Search activity
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a system or event" />
        </label>
      </div>
      <section className="data-page_panel" aria-labelledby="events-title">
        <h2 id="events-title">Event log</h2>
        <p className="activity-page_count" role="status">{filtered.length} events · Sri Lanka time (UTC+05:30)</p>
        {filtered.length ? <ol className="activity-page_list">
          {filtered.map((event) => (
            <li key={event.id} className="activity-page_event">
              <div>
                <h3>{event.system}</h3>
                <p>{event.message}</p>
                <time dateTime={event.recordedAt}>{new Date(event.recordedAt).toLocaleString('en-GB', { timeZone: 'Asia/Colombo' })}</time>
              </div>
              <span className={`activity-page_badge is-${event.status}`}>{labels[event.status] || event.status}</span>
            </li>
          ))}
        </ol> : <p className="data-page_empty">No events match these filters.</p>}
      </section>
    </main>
  );
}

export default ActivityPage;
