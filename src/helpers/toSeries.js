/**
 * Convert columns to individual series.
 * This means that instead of an array with columns per line,
 * you get the value for each column in an indivual array.
 * This structure is used as input data for generating charts.
 * @param {Array<Object>} rows output from csv-parse
 * @param {Array<String>} columns array of columns that you want to get as a series
 * @returns {Object<Array>} return an object with structure of {ColumnName: [val1, val2]}
 */
export function toSeries(rows, columns)
{
  // check if both params are arrays
  if (!Array.isArray(rows) || !Array.isArray(columns)) {
    console.error('Rows parameter or Columns parameter is not an array.');
  }

  // create series for each column
  let series = {};
  columns.forEach(columnName => {
    series[columnName] = [];
    rows.forEach(row => {
      series[columnName].push(row[columnName]);
    });
  });

  // return series
  return series;
}