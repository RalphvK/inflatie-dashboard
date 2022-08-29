/**
 * Function to combine a dataset where multiple "Measures" are returned as separate rows.
 * All Measures are combined into a single row.
 * Each Measure must thus have the same number of unique records.
 * The first Measure's periods will be used for all other Measure values.
 * 
 * The often long and descriptive Measure names can be substituted for shorter aliases.
 * To set an alias; pass an Object as the second param with the following structure:
 * {'Very long measure name for housing prices': 'Housing_prices'}
 * 
 * @param {Array<Object>} rows output from parse-csv
 * @param {Object} aliasses object with structure { 'MeasureValue': 'Column name in output' }
 * @param {Boolean} errorOnNoMeasure determines whether input data without a Measure column displays an error
 * @returns {Array<Object>}
 */
export function joinMeasures(rows, aliasses = null, errorOnNoMeasure = false)
{
  // check if data has Measure column
  if ('Measure' in rows[0] == false) {
    if (errorOnNoMeasure) {
      console.error('Dataset has no Measure column.');
    }
    return rows; // return rows unchanged
  }

  // if Measure column does exist, get unique Measures
  let measures = [];
  {
    let measureHitTwice = false; // will be set to true when the same measure is found twice, exiting the loop
    let i = 0;
    while (measureHitTwice == false) {
      // if Measure does not yet exist in list, add
      if (!measures.includes(rows[i].Measure)) {
        measures.push(rows[i].Measure);
      // else exit while loop
      } else {
       measureHitTwice = true;
      }
      i++;
    }
  }

  // split Measures into separate arrays
  let rowsByMeasure = {};
  measures.forEach(measureValue => {
    let currentMeasureRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].Measure == measureValue) {
        currentMeasureRows.push(rows[i]);
      }
    }
    rowsByMeasure[measureValue] = currentMeasureRows;
  });

  // set non-measure columns, taking first measure as base
  let joinedRows = [];
  // iterate through unique rows
  for (let i = 0; i < rowsByMeasure[measures[0]].length; i++) {
    const currRow = rowsByMeasure[measures[0]][i];
    joinedRows[i] = {}; // init object for row
    // iterate through columns
    for (const key in currRow) {
      // copy all except Measure, Unit and Value
      if (!['Measure', 'Unit', 'Value'].includes(key)) {
        joinedRows[i][key] = currRow[key];
      }
    }
  }

  let getColumnName = function(measureName) {
    if (!aliasses || measureName in aliasses == false) {
      return measureName;
    }
    return aliasses[measureName];
  }

  // add additional measures for each row
  measures.forEach(measureName => {
    for (let i = 0; i < joinedRows.length; i++) {
      joinedRows[i][getColumnName(measureName)] = rowsByMeasure[measureName][i].Value;
    }
  });

  // return joined rows
  return joinedRows;
}