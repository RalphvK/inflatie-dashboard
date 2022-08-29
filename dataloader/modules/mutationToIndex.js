import _ from 'lodash';

export function mutationToIndex(records, valueColumn = 'Value', precision = 1) {
  // set start value = 100
  let currentVal = 100;
  // init output list
  let outputRecords = [];
  // iterate through records and apply value as percentage
  for (let i = 0; i < records.length; i++) {
    if (i !== 0) {
      currentVal = ((parseFloat(records[i][valueColumn]) / 100) + 1) * currentVal;
    }
    let updatedRecord = records[i];
    updatedRecord[valueColumn] = _.round(currentVal, precision);
    outputRecords.push(updatedRecord);
  }
  // return updated records
  return outputRecords;
}