import './StatusBadge.css';

function StatusBadge({ status }) {
  const statuses = {
    fresh: { className: 'is-fresh', text: '✓ Reading received' },
    stale: { className: 'is-stale', text: '! Outdated reading' },
    missing: { className: 'is-missing', text: 'Not received' }
  };
  const badge = statuses[status] || statuses.missing;

  return (
    <span className={`status-badge ${badge.className}`}>
      {badge.text}
    </span>
  );
}

export default StatusBadge;
