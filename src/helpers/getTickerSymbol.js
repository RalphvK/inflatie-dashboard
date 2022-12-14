export function getTickerSymbol(SentientNumber) {
  if (!SentientNumber || typeof SentientNumber.toFloat !== 'function') {
    return 'none';
  } else if (SentientNumber && SentientNumber.toFloat() > 0.2) {
    return 'up';
  } else if (SentientNumber && SentientNumber.toFloat() < -0.2) {
    return 'down';
  } else {
    return 'neutral';
  }
}