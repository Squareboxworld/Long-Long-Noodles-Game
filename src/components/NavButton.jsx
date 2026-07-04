export default function NavButton({ active, icon, label, onClick }) {
  const isFarmMain = label === 'Farm';
  const ariaLabel = active ? `${label}, current page` : label;

  return (
    <button
      className={active ? 'nav-button nav-button-active' : 'nav-button'}
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <span className="nav-button-icon" aria-hidden="true">{icon}</span>
      <span className="nav-button-label">{label}</span>
      {isFarmMain ? <span className="nav-main-badge">Main</span> : null}
      {active ? <span className="nav-current-badge">Current</span> : null}
    </button>
  );
}
