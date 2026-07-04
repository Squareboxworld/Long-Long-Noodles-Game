import { getAssetPath } from '../utils/assets.js';
import {
  ACTIVE_GROWTH_MODE_LABEL,
  CROP_SLOT_STATUS,
} from '../game/gameConstants.js';
import { isDisplayReadyToHarvest, isDisplayWheatCrop } from '../utils/cropDisplay.js';
import { getFarmMilestoneProgress } from '../utils/milestones.js';
import { formatRelativeTime } from '../utils/timeFormat.js';

const inventoryCards = [
  {
    key: 'gold',
    label: 'Gold',
    assetId: 'icon_gold_coin',
    icon: '🪙',
    note: 'Used to buy wheat seeds.',
  },
  {
    key: 'wheatSeeds',
    label: 'Wheat Seeds',
    assetId: 'icon_wheat_seed',
    icon: '🌰',
    note: 'Plant these on empty soil slots.',
  },
  {
    key: 'wheat',
    label: 'Wheat',
    assetId: 'icon_wheat',
    icon: '🌾',
    note: 'Sell this at the Pawn Shop for gold.',
  },
];

const progressGroups = [
  {
    title: 'Farming',
    assetId: 'icon_wheat',
    stats: [
      ['lifetimeWheatPlanted', 'Wheat planted'],
      ['lifetimeWheatWatered', 'Wheat watered'],
      ['lifetimeWheatHarvested', 'Wheat harvested'],
    ],
  },
  {
    title: 'Trading',
    assetId: 'icon_gold_coin',
    stats: [
      ['lifetimeWheatSold', 'Wheat sold'],
      ['lifetimeSeedsBought', 'Seeds bought'],
      ['lifetimeGoldEarned', 'Gold earned'],
      ['lifetimeGoldSpent', 'Gold spent'],
    ],
  },
  {
    title: 'Save / Debug',
    assetId: 'icon_water_drop',
    stats: [
      ['totalResets', 'Reset count'],
    ],
  },
];

function getProgressValue(progress, key) {
  return Number.isFinite(progress?.[key]) ? progress[key] : 0;
}

function isActiveWheatSlot(slot) {
  return isDisplayWheatCrop(slot);
}

function isMatureWheatSlot(slot) {
  return isDisplayReadyToHarvest(slot);
}

function getCurrentFarmStatus(farm) {
  const cropSlots = farm.cropSlots ?? [];

  return [
    {
      label: 'Empty slots',
      value: cropSlots.filter((slot) => slot.status === CROP_SLOT_STATUS.EMPTY).length,
      note: 'Empty Soil ready for wheat seeds.',
    },
    {
      label: 'Wheat in soil',
      value: cropSlots.filter(isActiveWheatSlot).length,
      note: 'Any wheat currently in soil.',
    },
    {
      label: 'Needs Water',
      value: cropSlots.filter((slot) => isActiveWheatSlot(slot) && !slot.isWatered && !isMatureWheatSlot(slot)).length,
      note: 'Water these to start growth.',
    },
    {
      label: 'Growing',
      value: cropSlots.filter((slot) => isActiveWheatSlot(slot) && slot.isWatered && !isMatureWheatSlot(slot)).length,
      note: 'Watered and not ready yet.',
    },
    {
      label: 'Ready to Harvest',
      value: cropSlots.filter(isMatureWheatSlot).length,
      note: 'Ready to harvest.',
    },
  ];
}

function getProgressSummary(gameState) {
  const progress = gameState.progress ?? {};
  const farm = gameState.farm;
  const cropSlots = farm.cropSlots ?? [];
  const totalCycleActions =
    getProgressValue(progress, 'lifetimeWheatPlanted') +
    getProgressValue(progress, 'lifetimeWheatWatered') +
    getProgressValue(progress, 'lifetimeWheatHarvested');
  const netGold =
    getProgressValue(progress, 'lifetimeGoldEarned') -
    getProgressValue(progress, 'lifetimeGoldSpent');
  const farmCapacity = cropSlots.length || farm.landCount * farm.cropSlotsPerLand;

  return [
    {
      label: 'Total wheat cycle actions',
      value: totalCycleActions,
      note: 'Plant + water + harvest actions.',
    },
    {
      label: 'Net gold from trading',
      value: netGold,
      note: 'Gold earned minus gold spent.',
    },
    {
      label: 'Current farming capacity',
      value: farmCapacity,
      note: `${farm.landCount} land x ${farm.cropSlotsPerLand} crop slots.`,
    },
  ];
}

function formatSaveDate(timestamp) {
  if (!timestamp) {
    return 'Unknown';
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatActivityTimestamp(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown time';
  }

  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getLocalSaveInfo(gameState) {
  return [
    ['Save type', 'Local browser save'],
    ['Save location', 'This browser/device only'],
    ['Online account', 'Not available in this prototype'],
    ['Backend', 'Not connected'],
    ['Version', 'Version 0.5 local prototype'],
    ['Dev mode', `${ACTIVE_GROWTH_MODE_LABEL} active`],
    ['Created', formatSaveDate(gameState.createdAt)],
    ['Last saved', formatSaveDate(gameState.updatedAt)],
  ];
}

function hideBrokenImage(event) {
  event.currentTarget.hidden = true;
}

function InventoryIcon({ assetId, fallback }) {
  const iconPath = getAssetPath(assetId);

  if (iconPath) {
    return (
      <img
        alt=""
        className="inventory-icon inventory-image-icon"
        draggable="false"
        onError={hideBrokenImage}
        src={iconPath}
      />
    );
  }

  return (
    <span className="inventory-icon" aria-hidden="true">
      {fallback}
    </span>
  );
}

export default function InventoryPage({ gameState }) {
  const { farm, inventory } = gameState;
  const progress = gameState.progress ?? {};
  const farmStatus = getCurrentFarmStatus(farm);
  const progressSummary = getProgressSummary(gameState);
  const farmMilestones = getFarmMilestoneProgress(progress);
  const completedMilestoneCount = farmMilestones.filter((milestone) => milestone.completed).length;
  const localSaveInfo = getLocalSaveInfo(gameState);
  const activityLog = gameState.activityLog ?? [];

  return (
    <section className="inventory-page">
      <div className="section-heading">
        <p className="eyebrow">Starter resources</p>
        <h2>Inventory</h2>
        <p>
          Check your gold, wheat seeds, and harvested wheat.
        </p>
      </div>

      <div className="inventory-grid">
        {inventoryCards.map((item) => (
          <article className="inventory-card" key={item.label}>
            <InventoryIcon assetId={item.assetId} fallback={item.icon} />
            <h3>{item.label}</h3>
            <strong>{inventory[item.key]}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <section className="local-save-info-panel" aria-labelledby="local-save-info-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Local prototype save</p>
            <h3 id="local-save-info-heading">Local Save Info</h3>
          </div>
          <p>
            Your progress is saved in this browser using localStorage. Clearing browser data or
            using another device may remove or hide this save.
          </p>
        </div>

        <dl className="local-save-info-grid">
          {localSaveInfo.map(([label, value]) => (
            <div className="local-save-info-card" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="progress-tracking-panel" aria-labelledby="progress-tracking-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Version 0.3 statistics</p>
            <h3 id="progress-tracking-heading">Progress Tracking</h3>
          </div>
          <p>
            Read-only lifetime counters stored in this browser for prototype testing.
          </p>
        </div>

        <div className="stats-group-grid">
          {progressGroups.map((group) => (
            <article className="stats-group-card" key={group.title}>
              <div className="stats-group-heading">
                <InventoryIcon assetId={group.assetId} fallback="" />
                <h4>{group.title}</h4>
              </div>
              <dl className="stat-list">
                {group.stats.map(([key, label]) => (
                  <div className="stat-row" key={key}>
                    <dt>{label}</dt>
                    <dd>{getProgressValue(progress, key)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="farm-status-panel" aria-labelledby="farm-status-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Farm at a glance</p>
            <h3 id="farm-status-heading">Current Farm Status</h3>
          </div>
          <p>
            These counts are derived from the current crop slots and are not stored separately.
          </p>
        </div>

        <div className="farm-status-grid">
          {farmStatus.map((item) => (
            <article className="farm-status-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="progress-summary-panel" aria-labelledby="progress-summary-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Simple summary</p>
            <h3 id="progress-summary-heading">Progress Summary</h3>
          </div>
          <p>
            Short derived local totals for checking the farming loop. No rewards, levels, or
            online account progress.
          </p>
        </div>

        <div className="progress-summary-grid">
          {progressSummary.map((item) => (
            <article className="progress-summary-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="farm-milestones-panel" aria-labelledby="farm-milestones-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Read-only progress markers</p>
            <h3 id="farm-milestones-heading">Farm Milestones</h3>
          </div>
          <p>
            Milestones are read-only local progress markers in this prototype. They do not give
            rewards, XP, levels, unlocks, or online account achievements.
          </p>
        </div>

        <div className="milestone-summary-pill" aria-label="Completed farm milestones">
          <span>Completed</span>
          <strong>{completedMilestoneCount} / {farmMilestones.length}</strong>
        </div>

        <div className="farm-milestones-grid">
          {farmMilestones.map((milestone) => (
            <article
              className={
                milestone.completed
                  ? 'farm-milestone-card farm-milestone-completed'
                  : 'farm-milestone-card'
              }
              key={milestone.id}
            >
              <div className="farm-milestone-heading">
                <h4>{milestone.title}</h4>
                <span>{milestone.completed ? 'Completed' : 'In progress'}</span>
              </div>
              <p>{milestone.description}</p>
              <div className="farm-milestone-progress">
                <span>Progress</span>
                <strong>{milestone.progressLabel}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="farm-activity-log-panel" aria-labelledby="farm-activity-log-heading">
        <div className="stats-panel-header">
          <div>
            <p className="eyebrow">Recent local actions</p>
            <h3 id="farm-activity-log-heading">Farm Activity Log</h3>
          </div>
          <p>
            Recent successful farming and Pawn Shop actions from this browser. Local-only,
            capped, and reward-free.
          </p>
        </div>

        {activityLog.length > 0 ? (
          <ol className="farm-activity-list">
            {activityLog.map((activity) => (
              <li className={`farm-activity-item farm-activity-${activity.type}`} key={activity.id}>
                <div>
                  <p>{activity.message}</p>
                  <time dateTime={activity.createdAt} title={formatActivityTimestamp(activity.createdAt)}>
                    {formatRelativeTime(activity.createdAt)}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="farm-activity-empty">Your recent farm actions will appear here.</p>
        )}
      </section>
    </section>
  );
}
