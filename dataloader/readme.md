# Inflatiedashboard data repo

This repo contains the scripts to automatically fetch and generate the datasets required for the Inflatiedashboard.

## Usage

To fetch all datasets and generate the `dashboard_datasets.json` file, run:
```
npm run fetch-data
```

## Configuration

### Dataset URLs and transformations

The data to be fetched and the way it is parsed is controlled via the `dataset_definitions.js` file. This file exports an object with the following structure:

```javascript
{
  datasetName: {
    description: 'Some dataset for consumers',
    url: 'https://example.com/dataset',
    transform(records) { return records };
  }
}
```

### File export option

The `fetch-data` command runs the `fetchAllDatasets.js` script. This file has some options at the top of the file in the `options` const. Here you can enable/disable:

* Individual exports: creates separate `.json` files in the `./exports` folder for each dataset, in addition to the combined datasets file.
* Saving of downloaded `.csv` files in the `./downloads` folder.