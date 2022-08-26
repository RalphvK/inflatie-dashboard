import { round } from 'lodash';
import { SentientPercentagePoint } from '@/helpers/SentientNumbers.js';

/**
 * Function to calculate percentage point change of last row to previous row.
 * Result is returned as either a SentienPercentagePoint instance, or string '-' if empty.
 * @param {Array<Object>} dataset Array of records in dataset, as stored in the .json file
 * @param {String} valueColumn name of the column to use for calculating PPT to last month
 * @returns {Object|String}
 */
export function dataPptLastToPrev(dataset = null, valueColumn = 'Value') {
  // check if data is present and more than 1 element
  if (Array.isArray(dataset) && dataset.length > 0) {
    let lastValue = dataset[dataset.length - 1][valueColumn];
    let prevValue = dataset[dataset.length - 2][valueColumn];
    return new SentientPercentagePoint(round(lastValue - prevValue, 1));
  } else {
    return '-';
  }
}