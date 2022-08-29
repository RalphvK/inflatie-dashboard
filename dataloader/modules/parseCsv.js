import { parse } from 'csv-parse/sync';

export function parseCsv(body)
{
  return parse(body, {
    columns: true,
    delimiter: ';',
    skip_empty_lines: true,
    bom: true
  });
}