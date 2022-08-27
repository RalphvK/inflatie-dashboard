export function getTickerSymbol(SentientNumber) {
  if (!SentientNumber || typeof SentientNumber.getFloat !== 'function') {
    return 'none';
  } else if (SentientNumber && SentientNumber.getFloat() > 0.2) {
    return 'up';
  } else if (SentientNumber && SentientNumber.getFloat() < -0.2) {
    return 'down';
  } else {
    return 'neutral';
  }
}