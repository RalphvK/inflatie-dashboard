# Inflatiedashboard

A small side project to experiment with Github actions pulling in remote csv files and to test a different project structure in Vue. It is not actively maintained and not a commercial product.

## Dataloader

The `dataloader` folder contains the scripts to automatically fetch and generate the datasets required for the Inflatiedashboard.

### Usage

To fetch all datasets and generate the `./public/datasets/dashboard_datasets.json` file, run:
```
npm run fetch-data
```

This command is periodically executed on the server to stay up to date with the CBS data.

### Configuration

#### Dataset URLs and transformations

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

#### File export option

The `fetch-data` command runs the `fetchAllDatasets.js` script. This file has some options at the top of the file in the `options` const. Here you can enable/disable:

* Individual exports: creates separate `.json` files in the `./dataloader/exports` folder for each dataset, in addition to the combined datasets file.
* Saving of downloaded `.csv` files in the `./dataloader/downloads` folder.
