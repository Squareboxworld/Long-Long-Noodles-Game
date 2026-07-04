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

const objectiveCueAssetIds = {
  buy: 'icon_wheat_seed',
  harvest: 'icon_wheat',
  plant: 'icon_wheat_seed',
  sell: 'icon_gold_coin',
  stuck: 'icon_wheat_seed',
  wait: 'icon_water_drop',
  water: 'icon_water_drop',
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
      action: 'harvest',
      cue: 'Harvest wheat',
      detail: 'Harvest mature wheat, then sell it at the Pawn Shop.',
      label: 'Ready to harvest',
      title: 'Harvest your mature wheat.',
    };
  }

  if (hasUnwateredWheat) {
    return {
      action: 'water',
      cue: 'Water planted wheat',
      detail: 'Water planted wheat so it can grow.',
      label: 'Care for crops',
      title: 'Water your planted wheat so it can grow.',
    };
  }

  if (inventory.wheat > 0) {
    return {
      action: 'sell',
      cue: 'Sell wheat',
      detail: `Pawn Shop buys 1 wheat for ${PAWN_SHOP_WHEAT_SELL_PRICE} gold. Wheat does not automatically become seed.`,
      label: 'Visit Pawn Shop',
      title: 'Go to the Pawn Shop and sell wheat for gold.',
    };
  }

  if (inventory.gold >= WHEAT_SEED_COST && inventory.wheatSeeds === 0) {
    return {
      action: 'buy',
      cue: 'Buy wheat seeds',
      detail: `A wheat seed costs ${WHEAT_SEED_COST} gold.`,
      label: 'Buy seed',
      title: 'Buy wheat seeds from the Pawn Shop.',
    };
  }

  if (hasWateredGrowingWheat) {
    return {
      action: 'wait',
      cue: 'Growing',
      detail: 'Dev Fast Growth Mode makes this faster for testing.',
      label: 'Growing',
      title: 'Wait for your wheat to grow.',
    };
  }

  if (inventory.wheatSeeds > 0 && hasEmptySlot) {
    return {
      action: 'plant',
      cue: 'Plant seeds',
      detail: 'Start by selecting an empty soil slot and planting wheat.',
      label: 'Start here',
      title: 'Plant your wheat seeds in empty soil slots.',
    };
  }

  if (inventory.wheatSeeds === 0 && inventory.wheat === 0 && inventory.gold < WHEAT_SEED_COST) {
    return {
      action: 'stuck',
      cue: 'Reset if stuck',
      detail: 'This test build can get stuck here. Use Reset Dev State to restart.',
      label: 'Test build',
      title: 'You are stuck in this test build. Use Reset Dev State to restart.',
    };
  }

  return {
    action: 'loop',
    cue: 'Follow the loop',
    detail: 'Follow the farm loop: plant, water, grow, harvest, sell, buy wheat seeds, repeat.',
    label: 'Loop',
    title: 'Keep the wheat loop moving.',
  };
}

function getCropSlotVisualHint(gameState, slot) {
  if (isWheatCrop(slot) && (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE)) {
    return {
      className: 'crop-slot-hint-harvest',
      label: 'Harvest',
    };
  }

  if (isWheatCrop(slot) && !slot.isWatered && !slot.isMature) {
    return {
      className: 'crop-slot-hint-water',
      label: 'Needs water',
    };
  }

  if (isWheatCrop(slot) && slot.isWatered && !slot.isMature) {
    return {
      className: 'crop-slot-hint-growing',
      label: 'Growing',
    };
  }

  if (gameState.inventory.wheatSeeds > 0 && slot.status === CROP_SLOT_STATUS.EMPTY) {
    return {
      className: 'crop-slot-hint-plant',
      label: 'Plant here',
    };
  }

  return null;
}

function getSuggestedFarmAction(selectedSlot, plantIsValid, waterIsValid, harvestIsValid) {
  if (!selectedSlot) {
    return {
      action: 'select',
      message: 'Select a soil slot first.',
    };
  }

  if (harvestIsValid) {
    return {
      action: 'harvest',
      message: 'Harvest is the useful action for this mature wheat.',
    };
  }

  if (waterIsValid) {
    return {
      action: 'water',
      message: 'Water is the useful action for this planted wheat.',
    };
  }

  if (plantIsValid) {
    return {
      action: 'plant',
      message: 'Plant Wheat is the useful action for this empty soil slot.',
    };
  }

  if (isWheatCrop(selectedSlot) && selectedSlot.isWatered && !selectedSlot.isMature) {
    return {
      action: 'wait',
      message: 'This wheat is growing. Wait until it reaches 100%.',
    };
  }

  return {
    action: 'none',
    message: 'This slot has no useful farm action right now.',
  };
}

function getSelectedCropStatus(slot) {
  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'Empty Soil';
  }

  if (isWheatCrop(slot) && (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE)) {
    return 'Ready to Harvest';
  }

  if (isWheatCrop(slot) && !slot.isWatered) {
    return 'Needs Water';
  }

  if (isWheatCrop(slot) && slot.isWatered) {
    return 'Growing';
  }

  return 'Seed Planted';
}

function getSelectedCropStage(slot) {
  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'Empty Soil';
  }

  if (isWheatCrop(slot) && (slot.isMature || slot.growthProgress >= 100)) {
    return 'Ready to Harvest';
  }

  if (isWheatCrop(slot) && slot.growthProgress <= 0) {
    return 'Seed Planted';
  }

  return 'Growing';
}

function getSelectedCropNextAction(slot, inventory) {
  if (!slot) {
    return 'Select a soil slot first.';
  }

  if (slot.status === CROP_SLOT_STATUS.EMPTY) {
    return inventory.wheatSeeds > 0
      ? 'Plant wheat seed here.'
      : 'Buy wheat seeds at the Pawn Shop.';
  }

  if (isWheatCrop(slot) && (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE)) {
    return 'Harvest this wheat.';
  }

  if (isWheatCrop(slot) && !slot.isWatered) {
    return 'Water this wheat to start growth.';
  }

  if (isWheatCrop(slot)) {
    return 'Wait until this wheat reaches 100%.';
  }

  return 'No crop action is ready for this slot.';
}

function getSelectedCropSummary(slot, inventory) {
  if (!slot) {
    return 'Select a soil slot to see details.';
  }

  if (slot.status === CROP_SLOT_STATUS.EMPTY) {
    return inventory.wheatSeeds > 0
      ? 'This soil is empty and ready for a wheat seed.'
      : 'This soil is empty, but you need wheat seeds before planting.';
  }

  if (isWheatCrop(slot) && (slot.isMature || slot.status === CROP_SLOT_STATUS.MATURE)) {
    return 'This wheat is mature and ready to harvest.';
  }

  if (isWheatCrop(slot) && !slot.isWatered) {
    return 'This wheat is planted, but growth has not started yet.';
  }

  if (isWheatCrop(slot)) {
    return 'This wheat is watered and growing from its first watering time.';
  }

  return 'This crop slot has a planted crop.';
}

function getSelectedCropIconAssetId(slot) {
  if (!slot || slot.status === CROP_SLOT_STATUS.EMPTY) {
    return 'icon_wheat_seed';
  }

  if (isWheatCrop(slot) && !slot.isWatered && !slot.isMature) {
    return 'icon_water_drop';
  }

  return 'icon_wheat';
}

function getPlantBlockedMessage(gameState, selectedSlot) {
  if (!selectedSlot) {
    return 'Select an empty soil slot first.';
  }

  if (selectedSlot.status !== CROP_SLOT_STATUS.EMPTY) {
    return 'Choose an empty soil slot before planting.';
  }

  if (gameState.inventory.wheatSeeds < 1) {
    return 'You need wheat seeds. Sell wheat for gold, then buy wheat seeds at the Pawn Shop.';
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

function getActionClassName(baseClassName, isValid, assetPath, isSuggested = false) {
  return [
    baseClassName,
    isValid ? '' : 'action-softened',
    isSuggested ? 'action-suggested' : '',
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
  const selectedSlotIndex = selectedSlot
    ? farm.cropSlots.findIndex((slot) => slot.slotId === selectedSlot.slotId)
    : -1;
  const selectedCropStatus = getSelectedCropStatus(selectedSlot);
  const selectedCropStage = getSelectedCropStage(selectedSlot);
  const selectedCropNextAction = getSelectedCropNextAction(selectedSlot, inventory);
  const selectedCropSummary = getSelectedCropSummary(selectedSlot, inventory);
  const currentObjective = getCurrentObjective(gameState);
  const plantIsValid = canPlantWheat(gameState, selectedSlot?.slotId);
  const waterIsValid = canWaterCrop(gameState, selectedSlot?.slotId);
  const harvestIsValid = canHarvestWheat(gameState, selectedSlot?.slotId);
  const suggestedFarmAction = getSuggestedFarmAction(
    selectedSlot,
    plantIsValid,
    waterIsValid,
    harvestIsValid,
  );
  const farmBackgroundPath = getAssetPath('bg_farm_main');
  const squareboxIdlePath = getAssetPath('character_squarebox_idle');
  const plantButtonPath = getAssetPath(actionAssetIds.plantButton);
  const waterButtonPath = getAssetPath(actionAssetIds.waterButton);
  const harvestButtonPath = getAssetPath(actionAssetIds.harvestButton);
  const wheatSeedIconPath = getAssetPath(actionAssetIds.wheatSeedIcon);
  const waterIconPath = getAssetPath(actionAssetIds.waterIcon);
  const wheatIconPath = getAssetPath(actionAssetIds.wheatIcon);
  const currentObjectiveIconPath = getAssetPath(objectiveCueAssetIds[currentObjective.action]);
  const selectedCropIconPath = getAssetPath(getSelectedCropIconAssetId(selectedSlot));
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
          Plant, water, and harvest wheat here.
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
          <div className={`objective-cue objective-cue-${currentObjective.action}`}>
            <DecorativeImage className="objective-cue-icon" path={currentObjectiveIconPath} />
            <span>{currentObjective.cue}</span>
          </div>
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
            const slotVisualHint = getCropSlotVisualHint(gameState, slot);

            return (
              <button
                className={[
                  'crop-slot',
                  `crop-slot-${slot.status}`,
                  slotArt.soilPath ? 'crop-slot-with-art' : '',
                  slot.isWatered ? 'crop-slot-watered' : '',
                  slotVisualHint?.className ?? '',
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
                {slotVisualHint ? (
                  <span className="slot-action-hint">{slotVisualHint.label}</span>
                ) : null}
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

      <aside className="selected-slot-panel crop-detail-panel" aria-live="polite">
        <div className="crop-detail-header">
          <div>
            <p className="eyebrow">Selected Crop Slot</p>
            <h3>{selectedSlot ? `Slot ${selectedSlotIndex + 1}` : 'No slot selected'}</h3>
            <p className="crop-detail-summary">{selectedCropSummary}</p>
          </div>
          <DecorativeImage className="crop-detail-icon" path={selectedCropIconPath} />
        </div>

        {selectedSlot ? (
          <>
            <dl className="slot-detail-grid crop-detail-grid">
              <div>
                <dt>Slot</dt>
                <dd>{selectedSlot.slotId}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="crop-status-pill">{selectedCropStatus}</span>
                </dd>
              </div>
              <div>
                <dt>Crop</dt>
                <dd>{selectedSlot.cropType === CROP_TYPES.WHEAT ? 'Wheat' : 'None'}</dd>
              </div>
              <div>
                <dt>Stage</dt>
                <dd>{selectedCropStage}</dd>
              </div>
              <div>
                <dt>Progress</dt>
                <dd>{formatProgress(selectedSlot.growthProgress)}</dd>
              </div>
              <div>
                <dt>Watered</dt>
                <dd>{selectedSlot.isWatered ? 'Yes' : 'No'}</dd>
              </div>
              <div className="crop-detail-next-action">
                <dt>Next action</dt>
                <dd>{selectedCropNextAction}</dd>
              </div>
            </dl>

            <div
              className="crop-detail-progress"
              aria-label={`Selected crop growth progress ${formatProgress(selectedSlot.growthProgress)}`}
            >
              <div className="crop-detail-progress-header">
                <span>Growth Progress</span>
                <strong>{formatProgress(selectedSlot.growthProgress)}</strong>
              </div>
              <div className="crop-detail-progress-track">
                <span style={{ width: `${selectedSlot.growthProgress}%` }} />
              </div>
            </div>

            <dl className="crop-detail-times">
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
          </>
        ) : (
          <p className="crop-detail-empty-message">Select a soil slot to see details.</p>
        )}

        <p className={`action-helper action-helper-${suggestedFarmAction.action}`}>
          {suggestedFarmAction.message}
        </p>

        <div className="farm-actions">
          <button
            className={getActionClassName(
              'primary-action',
              plantIsValid,
              plantButtonPath,
              suggestedFarmAction.action === 'plant',
            )}
            style={getActionStyle(plantButtonPath)}
            type="button"
            aria-disabled={!plantIsValid}
            onClick={handlePlantWheat}
          >
            <DecorativeImage className="action-icon" path={wheatSeedIconPath} />
            <span className="action-text">Plant Wheat</span>
          </button>
          <button
            className={getActionClassName(
              'secondary-action',
              waterIsValid,
              waterButtonPath,
              suggestedFarmAction.action === 'water',
            )}
            style={getActionStyle(waterButtonPath)}
            type="button"
            aria-disabled={!waterIsValid}
            onClick={handleWaterCrop}
          >
            <DecorativeImage className="action-icon" path={waterIconPath} />
            <span className="action-text">Water</span>
          </button>
          <button
            className={getActionClassName(
              'harvest-action',
              harvestIsValid,
              harvestButtonPath,
              suggestedFarmAction.action === 'harvest',
            )}
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
