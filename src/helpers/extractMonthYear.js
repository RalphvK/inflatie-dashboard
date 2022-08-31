let months_dutch = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december'
];

export function extractLongMonth(value)
{
  let lcValue = String(value).toLowerCase();
  for (let i = 0; i < months_dutch.length; i++) {
    if (lcValue.includes(months_dutch[i])) {
      return months_dutch[i];
    }
  }
  return null;
}

export function extractYear(value)
{
  return String(value).slice(0, 4); // first 4 chars are year
}