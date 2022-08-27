import { defineStore } from "pinia";
import { merge } from "lodash";
import { dataPptLastToPrev } from "@/helpers/dataPptLastToPrev.js";
import { dataGetLast } from "@/helpers/dataGetLast.js";
import DatasetsStore_CpiGroups_top from "@/store/DatasetsStore_CpiGroups_top.js";

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    _ready: false,
    cpi: null,
    cpi_energie: null,
    cpi_voedingsmiddelen: null,
    cpi_groepen: null
  }),

  getters: {
    // CPI
    g_cpi_YoY(state) {
      return dataGetLast(state.cpi);
    },
    g_cpi_PPT(state) {
      return dataPptLastToPrev(state.cpi);
    },

    // CPI energy
    g_cpiEnergy_YoY(state) {
      return dataGetLast(state.cpi_energie);
    },
    g_cpiEnergy_PPT(state) {
      return dataPptLastToPrev(state.cpi_energie);
    },

    // CPI food
    g_cpiFood_YoY(state) {
      return dataGetLast(state.cpi_voedingsmiddelen);
    },
    g_cpiFood_PPT(state) {
      return dataPptLastToPrev(state.cpi_voedingsmiddelen);
    },

    // get highest CPI YoY groups (excl. energy/food)
    g_cpiGroups_top(state) {
      return DatasetsStore_CpiGroups_top(state);
    }
  },

  actions: {
    fetchDatasets() {
      let store = this;
      // fetch dataset from url
      fetch(import.meta.env.VITE_DATASET_URL)
        // parse json response
        .then((response) => response.json())
        .then((data) => {
          if (import.meta.env.VITE_THROTTLE_FETCH) {
            setTimeout(() => {
              merge(store.$state, data);
              store._ready = true;
            }, 1000);
          } else {
            merge(store.$state, data);
            store._ready = true;
          }
        })
        .catch(() => {
          console.error('Could not fetch datasets!');
        });
    },
  },
});