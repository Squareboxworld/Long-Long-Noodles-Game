function pluralize(value, unit) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

export function formatDuration(milliseconds) {
  if (!Number.isFinite(milliseconds)) {
    return 'Unknown';
  }

  const safeMilliseconds = Math.max(0, milliseconds);

  if (safeMilliseconds > 0 && safeMilliseconds < 1000) {
    return 'less than 1 second';
  }

  const totalSeconds = Math.ceil(safeMilliseconds / 1000);

  if (totalSeconds < 60) {
    return pluralize(totalSeconds, 'second');
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (totalMinutes < 60) {
    return seconds > 0
      ? `${pluralize(totalMinutes, 'minute')} ${pluralize(seconds, 'second')}`
      : pluralize(totalMinutes, 'minute');
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalHours < 24) {
    return minutes > 0
      ? `${pluralize(totalHours, 'hour')} ${pluralize(minutes, 'minute')}`
      : pluralize(totalHours, 'hour');
  }

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return hours > 0
    ? `${pluralize(days, 'day')} ${pluralize(hours, 'hour')}`
    : pluralize(days, 'day');
}
