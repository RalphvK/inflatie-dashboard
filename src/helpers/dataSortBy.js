import { reverse, sortBy, toNumber } from "lodash";

export function dataSortByCol(records, sortByCol = 'Value', direction = 'desc') {
  // check if data is array
  if (!Array.isArray(records)) {
    console.error("Param 'records' is not an array!")
    return records;
  }

  // else sort items by highest Value (ascending)
  let sorted = sortBy(records, function(row) {
    return toNumber(row[sortByCol]);
  });
  
  // reverse array to make descending, if direction is 'desc'
  if (direction.toLowerCase() == 'desc') {
    sorted = reverse(sorted);
  }

  // return sorted records
  return sorted;
}