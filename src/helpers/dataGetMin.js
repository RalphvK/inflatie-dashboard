import { isUndefined, min as _min, toNumber } from "lodash";

export function dataGetMin(valueSeries = []) {
  let numberSeries = [];
  // convert each element to number
  for (let i = 0; i < valueSeries.length; i++) {
    numberSeries[i] = toNumber(valueSeries[i]);
  }
  // get min
  let min = _min(numberSeries);
  return isUndefined(min) ? 0 : Math.ceil(min);
}