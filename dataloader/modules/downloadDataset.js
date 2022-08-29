import axios from "axios";
import * as fs from 'fs';

export function downloadDataset(url, name, storeFile = false)
{
  return new Promise((resolve, reject) => {

    axios.get(url)
      .then(function (response) {
        if (storeFile) {
          fs.writeFileSync(`./dataloader/downloads/${name}.csv`, response.data, 'utf-8');
        }
        console.log("Finished downloading "+name);
        resolve({
          [name]: response.data
        });
      })
      .catch(function (error) {
        reject(error);
      })

  });
}