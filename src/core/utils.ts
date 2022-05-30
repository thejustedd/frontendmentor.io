export function getCorrectTime(time: number, timeUnit = 'hr') {
  if (time <= 0) return 0 + timeUnit;
  return `${time}${timeUnit}${time > 1 ? 's' : ''}`;
}