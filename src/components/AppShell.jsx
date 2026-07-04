import { navigationItems } from '../data/navigation.js';
import { ACTIVE_GROWTH_MODE_LABEL } from '../game/gameConstants.js';
import { getAssetPath } from '../utils/assets.js';
import NavButton from './NavButton.jsx';

const hudResources = [
  {
    key: 'gold',
    label: 'Gold',
    assetId: 'icon_gold_coin',
  },
  {
    key: 'wheatSeeds',
    label: 'Wheat Seeds',
    assetId: 'icon_wheat_seed',
  },
  {
    key: 'wheat',
    label: 'Wheat',
    assetId: 'icon_wheat',
  },
];

function hideBrokenImage(event) {
  event.currentTarget.hidden = true;
}

function ResourceChip({ assetId, label, value }) {
  const iconPath = getAssetPath(assetId);

  return (
    <article className="hud-resource-chip" aria-label={`${label}: ${value}`}>
      {iconPath ? (
        <img
          alt=""
          className="hud-resource-icon"
          draggable="false"
          onError={hideBrokenImage}
          src={iconPath}
        />
      ) : null}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function AppShell({
  activePage,
  children,
  gameState,
  onNavigate,
  onResetDevState,
}) {
  const inventory = gameState?.inventory ?? {};

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="game-title-block">
          <p className="eyebrow">Squarebox Farm</p>
          <h1>Road to Long Long Noodles</h1>
          <div className="shell-status-row" aria-label="Prototype status">
            <span className="version-status-label">Version 0.5 Prototype</span>
            <span className="shell-id-chip">Local Prototype</span>
            <span className="shell-mode-chip">{ACTIVE_GROWTH_MODE_LABEL} active</span>
          </div>
        </div>
        <div className="header-actions">
          <div className="resource-hud" aria-label="Current resources">
            {hudResources.map((resource) => (
              <ResourceChip
                assetId={resource.assetId}
                key={resource.key}
                label={resource.label}
                value={inventory[resource.key] ?? 0}
              />
            ))}
          </div>
          <div className="dev-reset-control">
            <button className="dev-reset-button" type="button" onClick={onResetDevState}>
              Reset Dev State
            </button>
            <p>
              Restarts this browser's test state. Mainly for development/testing.
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
