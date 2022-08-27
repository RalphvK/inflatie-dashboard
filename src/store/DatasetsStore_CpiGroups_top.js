import { reverse, sortBy, toNumber } from "lodash";

export default function(state) {
  // check if data is available
  if (!Array.isArray(state.cpi_groepen)) {
    return null;
  }
  const records = state.cpi_groepen;
  // else sort items by highest Value (ascending)
  let sorted = sortBy(records, function(row) {
    return toNumber(row.Value);
  });
  // reverse array to make descending
  sorted = reverse(sorted);
  // return sorted records
  return sorted;
}