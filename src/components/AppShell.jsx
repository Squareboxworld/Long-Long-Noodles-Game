import { navigationItems } from '../data/navigation.js';
import NavButton from './NavButton.jsx';

export default function AppShell({ activePage, children, onNavigate, onResetDevState }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Version 0.3 local prototype</p>
          <h1>Road to Long Long Noodles</h1>
          <span className="version-status-label">Version 0.3 Prototype</span>
        </div>
        <div className="header-actions">
          <div className="weather-pill" aria-label="Soft cloudy farm mood">
            ☁️ gentle farm day
          </div>
          <div className="dev-reset-control">
            <button className="dev-reset-button" type="button" onClick={onResetDevState}>
              Reset Dev State
            </button>
            <p>
              Restarts this browser's prototype test state. Mainly for development/testing.
            </p>
          </div>
        </div>
      </header>

      <nav className="primary-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavButton
            key={item.id}
            active={item.id === activePage}
            icon={item.icon}
            label={item.label}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      <main className="page-frame">{children}</main>
    </div>
  );
}
