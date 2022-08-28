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
export function colorMappingDesc(measureValue, colorArray = null, fallback = THEME.neutral) {
  // default color mapping for CPI
  if (!Array.isArray(colorArray)) {
    colorArray = mapping_YearOnYear;
  }
  // iterate through mapping and return first that is lower than value
  for (let i = 0; i < colorArray.length; i++) {
    if (measureValue >= colorArray[i].min) {
      return colorArray[i].color;
    }
  }
  return fallback;
}

export const mapping_YearOnYear = [
  {min: 5, color: THEME.danger},
  {min: 3, color: THEME.warning},
  {min: 1, color: THEME.success},
  {min: 0, color: THEME.warning},
  {min: -Infinity, color: THEME.danger}
];

// mapping for when YearOnYear figure is positive
export const mapping_PptMonth_PositiveYoY = [
  {min: 2, color: THEME.danger},
  {min: 0, color: THEME.danger},
  {min: -3, color: THEME.neutral},
  {min: -20, color: THEME.green},
  {min: -Infinity, color: THEME.warning}
];

// mapping for when YearOnYear figure is low or negative
export const mapping_PptMonth_NegativeYoY = [
  {min: 0, color: THEME.info},
  {min: -2, color: THEME.warning},
  {min: -Infinity, color: THEME.danger}
];