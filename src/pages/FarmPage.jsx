import { useEffect, useState } from 'react';
import { canHarvestWheat, canPlantWheat, canWaterCrop } from '../game/gameActions.js';
import {
  ACTIVE_GROWTH_MODE_LABEL,
  GROWTH_RECALCULATION_INTERVAL_MS,
} from '../game/gameConstants.js';

const inventoryLabels = [
  ['gold', 'Gold'],
  ['wheatSeeds', 'Wheat Seeds'],
  ['wheat', 'Wheat'],
];

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
  const [selectedSlotId, setSelectedSlotId] = useState(farm.cropSlots[0]?.slotId ?? null);
  const [feedbackMessage, setFeedbackMessage] = useState(
    'Select a crop slot, then plant or water wheat.',
  );
  const selectedSlot =
    farm.cropSlots.find((slot) => slot.slotId === selectedSlotId) ?? farm.cropSlots[0];
  const plantIsValid = canPlantWheat(gameState, selectedSlot?.slotId);
  const waterIsValid = canWaterCrop(gameState, selectedSlot?.slotId);
  const harvestIsValid = canHarvestWheat(gameState, selectedSlot?.slotId);

  useEffect(() => {
    onRecalculateGrowth();

    const intervalId = window.setInterval(
      onRecalculateGrowth,
      GROWTH_RECALCULATION_INTERVAL_MS,
    );

    return () => window.clearInterval(intervalId);
  }, [onRecalculateGrowth]);

  function handlePlantWheat() {
    const result = onPlantWheat(selectedSlot?.slotId);
    setFeedbackMessage(result.message);
  }

  function handleWaterCrop() {
    const result = onWaterCrop(selectedSlot?.slotId);
    setFeedbackMessage(result.message);
  }

  function handleHarvestWheat() {
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
        {inventoryLabels.map(([key, label]) => (
          <article key={key}>
            <span>{label}</span>
            <strong>{inventory[key]}</strong>
          </article>
        ))}
      </div>

      <div className="farm-scene">
        <div className="farm-sky">
          <span>☁️</span>
          <span>☁️</span>
          <span>🌤️</span>
        </div>
        <div className="crop-grid" aria-label="Crop slots">
          {farm.cropSlots.map((slot, index) => (
            <button
              className={[
                'crop-slot',
                `crop-slot-${slot.status}`,
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
              <span className="slot-number">{index + 1}</span>
              <span className="slot-status">{slot.status}</span>
              {slot.isWatered ? <span className="slot-watered">watered</span> : null}
              {slot.cropType ? (
                <div className="slot-progress" aria-label={`Growth progress ${formatProgress(slot.growthProgress)}`}>
                  <span style={{ width: `${slot.growthProgress}%` }} />
                </div>
              ) : null}
              {slot.cropType ? (
                <span className="slot-progress-label">{formatProgress(slot.growthProgress)}</span>
              ) : null}
              <span className="slot-id">{slot.slotId}</span>
            </button>
          ))}
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
            className={plantIsValid ? 'primary-action' : 'primary-action action-softened'}
            type="button"
            aria-disabled={!plantIsValid}
            onClick={handlePlantWheat}
          >
            Plant Wheat
          </button>
          <button
            className={waterIsValid ? 'secondary-action' : 'secondary-action action-softened'}
            type="button"
            aria-disabled={!waterIsValid}
            onClick={handleWaterCrop}
          >
            Water
          </button>
          <button
            className={harvestIsValid ? 'harvest-action' : 'harvest-action action-softened'}
            type="button"
            aria-disabled={!harvestIsValid}
            onClick={handleHarvestWheat}
          >
            Harvest
          </button>
        </div>

        <p className="feedback-message">{feedbackMessage}</p>
      </aside>
    </section>
  );
}
