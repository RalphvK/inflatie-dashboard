export function getTickerSymbol(SentientNumber) {
  if (typeof SentientNumber.getFloat !== 'function') {
    console.log(SentientNumber);
    return 'none';
  } else if (SentientNumber && SentientNumber.getFloat() > 0.2) {
    return 'up';
  } else if (SentientNumber && SentientNumber.getFloat() < -0.2) {
    return 'down';
  } else {
    return 'neutral';
  }
}