import { THEME } from '@/config/constants.js';

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
 * @param {String} belowLast color below colorArray's last element's min value
 * @returns {String}
 */
export function colorMappingDesc(measureValue, colorArray = null, belowLast = THEME.danger) {
  // default color mapping for CPI
  if (!Array.isArray(colorArray)) {
    colorArray = [
      {min: 5, color: THEME.danger},
      {min: 3, color: THEME.warning},
      {min: 1, color: THEME.success},
      {min: 0, color: THEME.warning},
    ];
  }
  // iterate through mapping and return first that is lower than value
  for (let i = 0; i < colorArray.length; i++) {
    if (measureValue >= colorArray[i].min) {
      return colorArray[i].color;
    }
  }
  return belowLast;
}