import { getAssetPath } from '../utils/assets.js';
import { CROP_SLOT_STATUS, CROP_TYPES } from '../game/gameConstants.js';
import { getFarmMilestoneProgress } from '../utils/milestones.js';

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
  return slot.cropType === CROP_TYPES.WHEAT && slot.status !== CROP_SLOT_STATUS.EMPTY;
}

function isMatureWheatSlot(slot) {
  return isActiveWheatSlot(slot) &&
    (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE || slot.growthProgress >= 100);
}

function getCurrentFarmStatus(farm) {
  const cropSlots = farm.cropSlots ?? [];

  return [
    {
      label: 'Empty slots',
      value: cropSlots.filter((slot) => slot.status === CROP_SLOT_STATUS.EMPTY).length,
      note: 'Ready for future planting.',
    },
    {
      label: 'Planted wheat slots',
      value: cropSlots.filter(isActiveWheatSlot).length,
      note: 'Any wheat currently in soil.',
    },
    {
      label: 'Unwatered wheat slots',
      value: cropSlots.filter((slot) => isActiveWheatSlot(slot) && !slot.isWatered && !slot.isMature).length,
      note: 'Needs water before growth.',
    },
    {
      label: 'Growing wheat slots',
      value: cropSlots.filter((slot) => isActiveWheatSlot(slot) && slot.isWatered && !isMatureWheatSlot(slot)).length,
      note: 'Watered and not mature yet.',
    },
    {
      label: 'Mature wheat slots',
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
      note: 'Planted + watered + harvested.',
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
            Short derived totals for checking the local farming loop. No levels or rewards.
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
            Milestones are read-only progress markers in this prototype. They do not give
            rewards yet.
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
    </section>
  );
}
