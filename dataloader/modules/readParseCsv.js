import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readParseCsv(datasetFilename)
{
  let csvString = fs.readFileSync(`datasets/${datasetFilename}.csv`, 'utf8');
  return parse(csvString, {
    columns: true,
    delimiter: ';',
    skip_empty_lines: true,
    bom: true
  });
}