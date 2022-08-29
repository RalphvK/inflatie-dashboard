export function selectPeriod(records, periodValue, periodColumn = 'Perioden_code') {
  let outputRecords = [];
  records.forEach(row => {
    if (row[periodColumn] == periodValue) {
      outputRecords.push(row);
    }
  });
  return outputRecords;
}