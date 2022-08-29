import moment from "moment";

/**
 * Function to trim dataset to YTD relative to last period in dataset
 * IMPORTANT: dataset MUST be ordered on period in ASC order (old to new)
 * 
 * Example:
 * a dataset with records from 2021MM01 to 2022MM08 will be trimmed to:
 * records from 2021MM08 to 2022MM08
 * 
 * @param {Array<Object>} dataset output from csv-parse
 * @param {String} periodType type of period used in dataset, only 'month' is supported atm
 * @param {String} periodColumn name of column with period value, defaults to 'Perioden_code'
 * @returns {Array<Object>}
 */
export function trimYear(dataset, periodType = 'month', periodColumn = 'Perioden_code')
{
  // get last date
  let lastPeriodValue = dataset[dataset.length - 1][periodColumn];

  let yearEarlierPeriodString = ''; // oldest value allowed
  // calculate value for year earlier
  if (periodType == 'month') {
    // pattern is always YYYY'MM'MM in CBS datasets
    let yearEarlier = moment(lastPeriodValue, 'YYYY[MM]MM');
    yearEarlier.subtract(1, 'year');
    yearEarlierPeriodString = yearEarlier.format('YYYY[MM]MM');
  }

  // iterate backwards through array
  let yearEarlierHit = false; // flag set to true when yearEarlierPeriodString is found
  let removeTillKey = null;
  for (let i = dataset.length - 1; i >= 0; i--) {
    // search for period string, only once
    if (dataset[i][periodColumn] == yearEarlierPeriodString && !yearEarlierHit) {
      // when hit, set flag to true
      yearEarlierHit = true;
    // when past year earlier and entering older period
    } else if (yearEarlierHit && dataset[i][periodColumn] !== yearEarlierPeriodString && removeTillKey == null) {
      // set key to remove
      removeTillKey = i;
    }
  }

  // remove all keys up until removeTillKey
  dataset.splice(0, removeTillKey + 1);
  return dataset;
}