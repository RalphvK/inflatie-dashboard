import { isUndefined, max as _max, toNumber } from "lodash";

export function dataGetMax(valueSeries = []) {
  let numberSeries = [];
  // convert each element to number
  for (let i = 0; i < valueSeries.length; i++) {
    numberSeries[i] = toNumber(valueSeries[i]);
  }
  // get max
  let max = _max(numberSeries);
  return isUndefined(max) ? 0 : Math.ceil(max);
}