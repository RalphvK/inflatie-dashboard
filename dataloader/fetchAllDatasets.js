import * as fs from 'fs';
import { parseCsv } from './modules/parseCsv.js';
import { downloadDataset } from './modules/downloadDataset.js';

import { datasets, destination } from '../src/config/dataset_definitions.js';

// options (mostly for)
const options = {
  save_csv_downloads: true, // save downloaded .csv files in downloads folder
  export_individual_files: true  // save each dataset in individual json file
};

// download all datasets
let promises = [];
for (const name in datasets) {
  promises.push(downloadDataset(datasets[name].url, name, options.save_csv_downloads));
}

// then process datasets and store combined dataset
Promise.all(promises).then((responses) => {

  // combine all responses into one object
  let fetchedData = {};
  responses.forEach(response => {
    fetchedData = {...fetchedData, ...response}
  });

  // init datasets collection object
  var datasetsCollection = {};
  // iterate through datasets
  for (const name in datasets) {
    const datasetDef = datasets[name];
    // read and parse csv string
    let records = parseCsv(fetchedData[name]);
    // run transform function
    let processedRecords = datasetDef.transform(records);
    // add to datasets collection
    datasetsCollection[name] = processedRecords;
  };

  // save combined datasets file to destination
  fs.writeFileSync(destination, JSON.stringify(datasetsCollection), 'utf-8');

  // if inidividual files are enabled, create individual json files
  if (options.export_individual_files) {
    for (const name in datasetsCollection) {
      fs.writeFileSync(`./dataloader/exports/${name}.json`, JSON.stringify(datasetsCollection[name]), 'utf-8');
    }
  }

});