import { last } from 'lodash';
import { SentientPercentage } from '@/helpers/SentientNumber.js';

export function dataGetLast(dataset, valueColumn = 'Value')
{
  let lastRow = last(dataset) ?? null;
  return lastRow
    ? new SentientPercentage(lastRow[valueColumn])
    : null
}