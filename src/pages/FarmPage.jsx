import { useEffect, useState } from 'react';
import { canHarvestWheat, canPlantWheat, canWaterCrop } from '../game/gameActions.js';
import {
  ACTIVE_GROWTH_MODE_LABEL,
  CROP_SLOT_STATUS,
  CROP_TYPES,
  GROWTH_RECALCULATION_INTERVAL_MS,
  PAWN_SHOP_WHEAT_SELL_PRICE,
  WHEAT_SEED_COST,
} from '../game/gameConstants.js';
import { getAssetPath } from '../utils/assets.js';

const inventoryLabels = [
  ['gold', 'Gold', 'icon_gold_coin'],
  ['wheatSeeds', 'Wheat Seeds', 'icon_wheat_seed'],
  ['wheat', 'Wheat', 'icon_wheat'],
];

const actionAssetIds = {
  harvestButton: 'ui_button_harvest',
  plantButton: 'ui_button_plant',
  waterButton: 'ui_button_water',
  waterIcon: 'icon_water_drop',
  wheatIcon: 'icon_wheat',
  wheatSeedIcon: 'icon_wheat_seed',
};

const beginnerLoopSteps = [
  'Plant wheat seeds.',
  'Water planted wheat.',
  'Wait until the wheat becomes mature.',
  'Harvest wheat.',
  'Sell wheat at the Pawn Shop.',
  'Use gold to buy more wheat seeds.',
];

function isWheatCrop(slot) {
  return slot.cropType === CROP_TYPES.WHEAT && slot.status !== CROP_SLOT_STATUS.EMPTY;
}

function getCurrentObjective(gameState) {
  const { farm, inventory } = gameState;
  const slots = farm.cropSlots;
  const hasEmptySlot = slots.some((slot) => slot.status === CROP_SLOT_STATUS.EMPTY);
  const hasMatureWheat = slots.some(
    (slot) =>
      isWheatCrop(slot) &&
      (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE || slot.growthProgress >= 100),
  );
  const hasUnwateredWheat = slots.some(
    (slot) => isWheatCrop(slot) && !slot.isWatered && !slot.isMature,
  );
  const hasWateredGrowingWheat = slots.some(
    (slot) => isWheatCrop(slot) && slot.isWatered && !slot.isMature,
  );

  if (hasMatureWheat) {
    return {
      detail: 'Mature wheat gives 1 wheat and clears the crop slot.',
      label: 'Ready to harvest',
      title: 'Harvest your mature wheat.',
    };
  }

  if (hasUnwateredWheat) {
    return {
      detail: 'Watered wheat can start growing toward maturity.',
      label: 'Care for crops',
      title: 'Water your planted wheat so it can grow.',
    };
  }

  if (inventory.wheat > 0) {
    return {
      detail: `Pawn Shop buys 1 wheat for ${PAWN_SHOP_WHEAT_SELL_PRICE} gold. Wheat does not automatically become seed.`,
      label: 'Visit shop',
      title: 'Go to the Pawn Shop and sell wheat for gold.',
    };
  }

  if (inventory.gold >= WHEAT_SEED_COST && inventory.wheatSeeds === 0) {
    return {
      detail: `A wheat seed costs ${WHEAT_SEED_COST} gold.`,
      label: 'Buy seed',
      title: 'Buy wheat seeds from the Pawn Shop.',
    };
  }

  if (hasWateredGrowingWheat) {
    return {
      detail: 'Dev Fast Growth Mode makes this faster for testing.',
      label: 'Growing',
      title: 'Wait for your wheat to grow.',
    };
  }

  if (inventory.wheatSeeds > 0 && hasEmptySlot) {
    return {
      detail: 'Select an empty soil slot, then use Plant Wheat.',
      label: 'Start here',
      title: 'Plant your wheat seeds in empty soil slots.',
    };
  }

  if (inventory.wheatSeeds === 0 && inventory.wheat === 0 && inventory.gold < WHEAT_SEED_COST) {
    return {
      detail: 'This guidance does not add rescue rewards. Reset only restarts the local test state.',
      label: 'Test build',
      title: 'You are stuck in this test build. Use Reset Dev State to restart.',
    };
  }

  return {
    detail: 'Follow the farm loop: plant, water, grow, harvest, sell, buy seed, repeat.',
    label: 'Loop',
    title: 'Keep the wheat loop moving.',
  };
}

function getPlantBlockedMessage(gameState, selectedSlot) {
  if (!selectedSlot) {
    return 'Select an empty soil slot first.';
  }

  if (selectedSlot.status !== CROP_SLOT_STATUS.EMPTY) {
    return 'Choose an empty soil slot before planting.';
  }

  if (gameState.inventory.wheatSeeds < 1) {
    return 'You need wheat seeds. Sell wheat for gold, then buy seeds at the Pawn Shop.';
  }

  return 'Select an empty soil slot first.';
}

function getWaterBlockedMessage(selectedSlot) {
  if (!selectedSlot || selectedSlot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'Select planted wheat first.';
  }

  if (selectedSlot.cropType !== CROP_TYPES.WHEAT) {
    return 'Select planted wheat first.';
  }

  if (selectedSlot.isMature) {
    return 'This wheat is already mature. Harvest it instead.';
  }

  return 'Select planted wheat first.';
}

function getHarvestBlockedMessage(selectedSlot) {
  if (!selectedSlot) {
    return 'Select a crop slot first.';
  }

  if (selectedSlot.status === CROP_SLOT_STATUS.EMPTY || selectedSlot.cropType !== CROP_TYPES.WHEAT) {
    return 'There is no wheat here to harvest.';
  }

  return 'This wheat is still growing. Wait until it reaches 100%.';
}

function getWheatStageAssetId(slot) {
  if (slot.cropType !== CROP_TYPES.WHEAT) {
    return null;
  }

  if (slot.isMature || slot.growthProgress >= 100) {
    return 'crop_wheat_stage_04_mature';
  }

  if (slot.growthProgress <= 0) {
    return 'crop_wheat_stage_00_seed';
  }

  if (slot.growthProgress <= 25) {
    return 'crop_wheat_stage_01_sprout';
  }

  if (slot.growthProgress <= 50) {
    return 'crop_wheat_stage_02_small';
  }

  return 'crop_wheat_stage_03_growing';
}

function getCropSlotArt(slot) {
  const wheatStageAssetId = getWheatStageAssetId(slot);

  return {
    soilPath: getAssetPath(slot.status === 'empty' ? 'crop_soil_empty' : 'crop_soil_tilled'),
    thirstyOverlayPath: slot.isThirsty ? getAssetPath('crop_overlay_thirsty') : '',
    weedOverlayPath: slot.hasWeed ? getAssetPath('crop_overlay_weed') : '',
    wheatPath: wheatStageAssetId ? getAssetPath(wheatStageAssetId) : '',
  };
}

function getActionClassName(baseClassName, isValid, assetPath) {
  return [
    baseClassName,
    isValid ? '' : 'action-softened',
    assetPath ? 'farm-art-action' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function getActionStyle(assetPath) {
  return assetPath ? { '--button-art': `url("${assetPath}")` } : undefined;
}

function hideBrokenImage(event) {
  event.currentTarget.hidden = true;
}

function DecorativeImage({ alt = '', className, path }) {
  if (!path) {
    return null;
  }

  return (
    <img
      alt={alt}
      className={className}
      draggable="false"
      onError={hideBrokenImage}
      src={path}
    />
  );
}

function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'Not set';
  }

  return new Date(timestamp).toLocaleString();
}

function formatProgress(progress) {
  return `${Math.round(progress)}%`;
}

export default function FarmPage({
  gameState,
  onHarvestWheat,
  onPlantWheat,
  onRecalculateGrowth,
  onWaterCrop,
}) {
  const { farm, inventory } = gameState;
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Select a crop slot, then plant or water wheat.',
  );
  const selectedSlot = farm.cropSlots.find((slot) => slot.slotId === selectedSlotId) ?? null;
  const currentObjective = getCurrentObjective(gameState);
  const plantIsValid = canPlantWheat(gameState, selectedSlot?.slotId);
  const waterIsValid = canWaterCrop(gameState, selectedSlot?.slotId);
  const harvestIsValid = canHarvestWheat(gameState, selectedSlot?.slotId);
  const farmBackgroundPath = getAssetPath('bg_farm_main');
  const squareboxIdlePath = getAssetPath('character_squarebox_idle');
  const plantButtonPath = getAssetPath(actionAssetIds.plantButton);
  const waterButtonPath = getAssetPath(actionAssetIds.waterButton);
  const harvestButtonPath = getAssetPath(actionAssetIds.harvestButton);
  const wheatSeedIconPath = getAssetPath(actionAssetIds.wheatSeedIcon);
  const waterIconPath = getAssetPath(actionAssetIds.waterIcon);
  const wheatIconPath = getAssetPath(actionAssetIds.wheatIcon);
  const farmSceneStyle = farmBackgroundPath
    ? {
        backgroundImage:
          `linear-gradient(180deg, rgba(255, 252, 243, 0.12), rgba(112, 151, 83, 0.18)), url("${farmBackgroundPath}")`,
      }
    : undefined;

  useEffect(() => {
    onRecalculateGrowth();

    const intervalId = window.setInterval(
      onRecalculateGrowth,
      GROWTH_RECALCULATION_INTERVAL_MS,
    );

    return () => window.clearInterval(intervalId);
  }, [onRecalculateGrowth]);

  function handlePlantWheat() {
    if (!plantIsValid) {
      setFeedbackMessage(getPlantBlockedMessage(gameState, selectedSlot));
      return;
    }

    const result = onPlantWheat(selectedSlot?.slotId);
    setFeedbackMessage(result.message);
  }

  function handleWaterCrop() {
    if (!waterIsValid) {
      setFeedbackMessage(getWaterBlockedMessage(selectedSlot));
      return;
    }

    const result = onWaterCrop(selectedSlot?.slotId);
    setFeedbackMessage(result.message);
  }

  function handleHarvestWheat() {
    if (!harvestIsValid) {
      setFeedbackMessage(getHarvestBlockedMessage(selectedSlot));
      return;
    }

    const result = onHarvestWheat(selectedSlot?.slotId);
    setFeedbackMessage(result.message);
  }

  return (
    <section className="farm-page">
      <div className="section-heading">
        <p className="eyebrow">Main home screen</p>
        <h2>Farm</h2>
        <p>
          Select a crop slot to plant wheat or water planted wheat. Watered wheat now grows from
          real timestamps and can be harvested when mature.
        </p>
        <div className="growth-mode-label">{ACTIVE_GROWTH_MODE_LABEL}</div>
      </div>

      <div className="farm-state-bar" aria-label="Farm state summary">
        <article>
          <span>Land Count</span>
          <strong>{farm.landCount}</strong>
        </article>
        <article>
          <span>Crop Slots</span>
          <strong>{farm.cropSlots.length}</strong>
        </article>
        {inventoryLabels.map(([key, label, assetId]) => {
          const iconPath = getAssetPath(assetId);

          return (
            <article key={key}>
              <span className="farm-resource-label">
                <DecorativeImage className="farm-resource-icon" path={iconPath} />
                {label}
              </span>
              <strong>{inventory[key]}</strong>
            </article>
          );
        })}
      </div>

      <div className="farm-guidance-grid">
        <section className="current-objective-panel" aria-live="polite">
          <div>
            <p className="eyebrow">Current Goal</p>
            <span className="objective-label">{currentObjective.label}</span>
          </div>
          <h3>{currentObjective.title}</h3>
          <p>{currentObjective.detail}</p>
        </section>

        <section className="beginner-guide-panel">
          <div className="beginner-guide-header">
            <div>
              <p className="eyebrow">Beginner loop</p>
              <h3>Squarebox says: keep it simple.</h3>
            </div>
            <DecorativeImage className="beginner-guide-avatar" path={squareboxIdlePath} />
          </div>
          <ol className="beginner-guide-steps">
            {beginnerLoopSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="guide-note">
            This guide is only explanation. It does not give rewards or change the farm.
          </p>
        </section>
      </div>

      <div
        className={farmBackgroundPath ? 'farm-scene farm-scene-art' : 'farm-scene'}
        style={farmSceneStyle}
      >
        <div className="farm-sky" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {squareboxIdlePath ? (
          <div className="farm-character-perch" aria-hidden="true">
            <DecorativeImage className="farm-character-image" path={squareboxIdlePath} />
          </div>
        ) : null}
        <div className="crop-grid" aria-label="Crop slots">
          {farm.cropSlots.map((slot, index) => {
            const slotArt = getCropSlotArt(slot);

            return (
              <button
                className={[
                  'crop-slot',
                  `crop-slot-${slot.status}`,
                  slotArt.soilPath ? 'crop-slot-with-art' : '',
                  slot.isWatered ? 'crop-slot-watered' : '',
                  slot.slotId === selectedSlot?.slotId ? 'crop-slot-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={slot.slotId}
                type="button"
                aria-pressed={slot.slotId === selectedSlot?.slotId}
                onClick={() => setSelectedSlotId(slot.slotId)}
              >
                <span className="crop-slot-art" aria-hidden="true">
                  <DecorativeImage className="slot-soil-image" path={slotArt.soilPath} />
                  <DecorativeImage className="slot-wheat-image" path={slotArt.wheatPath} />
                  <DecorativeImage className="slot-overlay-image" path={slotArt.thirstyOverlayPath} />
                  <DecorativeImage className="slot-overlay-image" path={slotArt.weedOverlayPath} />
                </span>
                <span className="slot-number">{index + 1}</span>
                <span className="slot-status">{slot.status}</span>
                {slot.isWatered ? <span className="slot-watered">watered</span> : null}
                {slot.cropType ? (
                  <div
                    className="slot-progress"
                    aria-label={`Growth progress ${formatProgress(slot.growthProgress)}`}
                  >
                    <span style={{ width: `${slot.growthProgress}%` }} />
                  </div>
                ) : null}
                {slot.cropType ? (
                  <span className="slot-progress-label">{formatProgress(slot.growthProgress)}</span>
                ) : null}
                <span className="slot-id">{slot.slotId}</span>
              </button>
            );
          })}
        </div>
        <div className="farm-note">
          Watered wheat grows in real time and keeps progressing after refresh. Mature wheat can be
          harvested for 1 wheat. Pawn Shop buy/sell actions stay on the Pawn Shop page.
        </div>
      </div>

      <aside className="selected-slot-panel" aria-live="polite">
        <div>
          <p className="eyebrow">Selected crop slot</p>
          <h3>{selectedSlot ? selectedSlot.slotId : 'No slot selected'}</h3>
        </div>

        {selectedSlot ? (
          <dl className="slot-detail-grid">
            <div>
              <dt>Status</dt>
              <dd>{selectedSlot.status}</dd>
            </div>
            <div>
              <dt>Crop Type</dt>
              <dd>{selectedSlot.cropType ?? 'none'}</dd>
            </div>
            <div>
              <dt>Watered</dt>
              <dd>{selectedSlot.isWatered ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Thirsty</dt>
              <dd>{selectedSlot.isThirsty ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Has Weed</dt>
              <dd>{selectedSlot.hasWeed ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Mature</dt>
              <dd>{selectedSlot.isMature ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Can Harvest</dt>
              <dd>{harvestIsValid ? 'yes' : 'no'}</dd>
            </div>
            <div>
              <dt>Growth Progress</dt>
              <dd>{formatProgress(selectedSlot.growthProgress)}</dd>
            </div>
            <div>
              <dt>Planted At</dt>
              <dd>{formatTimestamp(selectedSlot.plantedAt)}</dd>
            </div>
            <div>
              <dt>Growth Started At</dt>
              <dd>{formatTimestamp(selectedSlot.growthStartedAt)}</dd>
            </div>
            <div>
              <dt>Last Watered At</dt>
              <dd>{formatTimestamp(selectedSlot.lastWateredAt)}</dd>
            </div>
          </dl>
        ) : null}

        <div className="farm-actions">
          <button
            className={getActionClassName('primary-action', plantIsValid, plantButtonPath)}
            style={getActionStyle(plantButtonPath)}
            type="button"
            aria-disabled={!plantIsValid}
            onClick={handlePlantWheat}
          >
            <DecorativeImage className="action-icon" path={wheatSeedIconPath} />
            <span className="action-text">Plant Wheat</span>
          </button>
          <button
            className={getActionClassName('secondary-action', waterIsValid, waterButtonPath)}
            style={getActionStyle(waterButtonPath)}
            type="button"
            aria-disabled={!waterIsValid}
            onClick={handleWaterCrop}
          >
            <DecorativeImage className="action-icon" path={waterIconPath} />
            <span className="action-text">Water</span>
          </button>
          <button
            className={getActionClassName('harvest-action', harvestIsValid, harvestButtonPath)}
            style={getActionStyle(harvestButtonPath)}
            type="button"
            aria-disabled={!harvestIsValid}
            onClick={handleHarvestWheat}
          >
            <DecorativeImage className="action-icon" path={wheatIconPath} />
            <span className="action-text">Harvest</span>
          </button>
        </div>

        <p className="feedback-message">{feedbackMessage}</p>
      </aside>
    </section>
  );
}
