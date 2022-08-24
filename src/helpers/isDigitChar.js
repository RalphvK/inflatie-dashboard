export function isDigitChar(value) {
  return RegExp('^[0-9]+$').test(String(value));
}