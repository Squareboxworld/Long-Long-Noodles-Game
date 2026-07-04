import { FARM_MILESTONES } from '../data/farmMilestones.js';

function getProgressNumber(progress, key) {
  const value = progress?.[key];

  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function getFarmMilestoneProgress(progress) {
  return FARM_MILESTONES.map((milestone) => {
    const currentValue = getProgressNumber(progress, milestone.progressKey);
    const completed = currentValue >= milestone.targetValue;

    return {
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      currentValue,
      targetValue: milestone.targetValue,
      completed,
      progressLabel: `${currentValue} / ${milestone.targetValue}`,
    };
  });
}
