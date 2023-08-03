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

export const mapping_neutral = [
  {min: 6, color: THEME.neutral},
  {min: 3, color: THEME.neutral},
  {min: 1, color: THEME.neutral},
  {min: 0, color: THEME.neutral},
  {min: -Infinity, color: THEME.neutral}
];

// inflation year-on-year color scale (considers deflation a bad thing)
export const mapping_YearOnYear_Inflation = [
  {min: 6, color: THEME.danger},
  {min: 3, color: THEME.warning},
  {min: 1, color: THEME.success},
  {min: 0, color: THEME.warning},
  {min: -Infinity, color: THEME.danger}
];

// default year-on-year color scale (considers deflation a warning)
export const mapping_YearOnYear = [
  {min: 6, color: THEME.danger},
  {min: 3, color: THEME.warning},
  {min: 1, color: THEME.success},
  {min: 0, color: THEME.success},
  {min: -Infinity, color: THEME.warning}
];

// default year-on-year color scale (considers deflation a good thing)
export const mapping_YearOnYear_Energy = [
  {min: 6, color: THEME.danger},
  {min: 3, color: THEME.warning},
  {min: 1, color: THEME.success},
  {min: 0, color: THEME.success},
  {min: -Infinity, color: THEME.success}
];

// color scale for year-on-year income change (eg. wages)
export const mapping_YearOnYear_Income = [
  {min: 6, color: THEME.success},
  {min: 3, color: THEME.hopeful},
  {min: 2, color: THEME.neutral},
  {min: 1, color: THEME.warning},
  {min: -Infinity, color: THEME.danger}
];

// PPT color mapping for when YearOnYear figure is positive
// (in this scenario PPT descrease means growth is slowing down)
export const mapping_PptMonth_PositiveYoY = [
  {min: 2, color: THEME.danger},
  {min: 0, color: THEME.danger},
  {min: -3, color: THEME.hopeful},
  {min: -20, color: THEME.green},
  {min: -Infinity, color: THEME.warning}
];

// PPT color mapping for income change (eg. wages)
export const mapping_PptMonth_Income = [
  {min: 2, color: THEME.success},
  {min: 1, color: THEME.hopeful},
  {min: 0.2, color: THEME.hopeful},
  {min: 0, color: THEME.warning},
  {min: -2, color: THEME.warning},
  {min: -Infinity, color: THEME.danger}
];