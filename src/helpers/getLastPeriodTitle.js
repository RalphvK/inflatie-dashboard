import { extractLongMonth, extractYear } from "@/helpers/extractMonthYear.js";

export function getLastPeriodTitle_MY(rows, columnName = 'Perioden_title')
{
  if (typeof rows === 'undefined' || !Array.isArray(rows)) {
    return null;
  }
  const last = rows[rows.length - 1][columnName];
  return [extractLongMonth(last), extractYear(last)].join(' ');
}