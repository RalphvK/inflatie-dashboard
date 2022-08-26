import { defineStore } from "pinia";
import { merge } from "lodash";
import { dataPptLastToPrev } from "@/helpers/dataPptLastToPrev.js";
import { dataGetLast } from "@/helpers/dataGetLast.js";

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    _ready: false,
    cpi: null,
    cpi_energie: null
  }),

  getters: {
    // CPI
    g_cpi_YTD(state) {
      return dataGetLast(state.cpi);
    },
    g_cpi_PPT(state) {
      return dataPptLastToPrev(state.cpi);
    },

    // CPI energy
    g_cpiEnergy_YTD(state) {
      return dataGetLast(state.cpi_energie);
    },
    g_cpiEnergy_PPT(state) {
      return dataPptLastToPrev(state.cpi_energie);
    },
  },

  actions: {
    fetchDatasets() {
      let store = this;
      // fetch dataset from url
      fetch(import.meta.env.VITE_DATASET_URL)
        // parse json response
        .then((response) => response.json())
        .then((data) => {
          merge(store.$state, data);
          store._ready = true;
        })
        .catch(() => {
          console.error('Could not fetch datasets!');
        });
    },
  },
});