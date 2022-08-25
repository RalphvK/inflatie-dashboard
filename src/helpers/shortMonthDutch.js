let months_dutch = {
  januari: 'JAN',
  februari: 'FEB',
  maart: 'MAR',
  april: 'APR',
  mei: 'MEI',
  juni: 'JUN',
  juli: 'JUL',
  augustus: 'AUG',
  september: 'SEP',
  oktober: 'OKT',
  november: 'NOV',
  december: 'DEC'
};

export function getShortMonthDutch(value)
{
  let lcValue = String(value).toLowerCase();
  for (const longMonth in months_dutch) {
    if (lcValue.includes(longMonth)) {
      return months_dutch[longMonth];
    }
  }
  return value;
}

export function getShortYearAndMonth(value, separator = ' ')
{
  let year = String(value).slice(2, 4); // first 4 chars are year
  let month = getShortMonthDutch(value);
  return month + separator + year;
}