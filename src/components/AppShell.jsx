import { navigationItems } from '../data/navigation.js';
import NavButton from './NavButton.jsx';

export default function AppShell({ activePage, children, onNavigate, onResetDevState }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Version 0.1 foundation</p>
          <h1>Road to Long Long Noodles</h1>
        </div>
        <div className="header-actions">
          <div className="weather-pill" aria-label="Soft cloudy farm mood">
            ☁️ gentle farm day
          </div>
          <button className="dev-reset-button" type="button" onClick={onResetDevState}>
            Reset Dev State
          </button>
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
