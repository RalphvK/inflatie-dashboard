/**
 * Function that iterates through array and returns first color where value is large than min.
 * Mapping is provided as array, with minimum values from high to low. Example:
 * [
 *   { min: 4, color: 'red' },
 *   { min: 0, color: 'green' }
 * ]
 * The example above will return 'red' if the value is >= 4, and 'green' if >= 0.
 * If the value is lower than 0, the fallback (param 3) would be returned.
 * 
 * @param {Number} measureValue value to color for
 * @param {Array<Object>} colorArray array of objects like: { min: 4, color: 'red' }
 * @param {String} fallback color below last element's min value in array
 * @returns {String}
 */
export function colorMappingDesc(measureValue, colorArray, fallback) {
  for (let i = 0; i < colorArray.length; i++) {
    if (measureValue >= colorArray[i].min) {
      return colorArray[i].color;
    }
  }
  return fallback
}