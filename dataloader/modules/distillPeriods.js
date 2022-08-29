/**
 * Function to distill specific type of period from dataset.
 * Period codes are searched for the keyword from param 2.
 * Only periods containing this keyWord will be returned in the output set.
 * By default, the function is setup to distill month periods.
 * Main use case is removing quarterly/yearly rows when querying by greater than [month].
 * 
 * @param {Array<Object>} dataset output from csv-parse
 * @param {String} keyWord string the value of the period column must match to be included
 * @param {String} periodColumn name of column containing period codes
 * @returns {Array<Object>}
 */
export function distillPeriods(dataset, keyWord = 'MM', periodColumn = 'Perioden_code') {
  let outputDataset = [];
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i][periodColumn].includes(keyWord)) {
      outputDataset.push(dataset[i]);
    }
  }
  return outputDataset;
}