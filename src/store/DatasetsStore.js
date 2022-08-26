import { defineStore } from "pinia";
import { merge } from "lodash";
import { dataPptLastToPrev } from "@/helpers/dataPptLastToPrev.js";
import { dataGetLast } from "@/helpers/dataGetLast.js";

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    _ready: false,
    cpi: null,
    cpi_energie: null,
    cpi_voedingsmiddelen: null
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

    // CPI food
    g_cpiFood_YTD(state) {
      return dataGetLast(state.cpi_voedingsmiddelen);
    },
    g_cpiFood_PPT(state) {
      return dataPptLastToPrev(state.cpi_voedingsmiddelen);
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