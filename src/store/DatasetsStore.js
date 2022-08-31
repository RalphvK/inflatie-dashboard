import { defineStore } from "pinia";
import { merge } from "lodash";
import { dataPptLastToPrev } from "@/helpers/dataPptLastToPrev.js";
import { dataGetLastAsPercentage } from "@/helpers/dataGetLast.js";
import { dataSortByCol } from "@/helpers/dataSortBy.js";

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    _ready: false,
    cpi: null,
    cpi_energie: null,
    cpi_voedingsmiddelen: null,
    cpi_groepen: null,
    koopwoningen: null,
    cao_lonen_mutatie: null,
    cao_uurloon: null,
    cao_uurloon_cpi: null
  }),

  getters: {
    // CPI
    g_cpi_YoY(state) {
      return dataGetLastAsPercentage(state.cpi);
    },
    g_cpi_PPT(state) {
      return dataPptLastToPrev(state.cpi);
    },

    // CPI energy
    g_cpiEnergy_YoY(state) {
      return dataGetLastAsPercentage(state.cpi_energie);
    },
    g_cpiEnergy_PPT(state) {
      return dataPptLastToPrev(state.cpi_energie);
    },

    // CPI food
    g_cpiFood_YoY(state) {
      return dataGetLastAsPercentage(state.cpi_voedingsmiddelen);
    },
    g_cpiFood_PPT(state) {
      return dataPptLastToPrev(state.cpi_voedingsmiddelen);
    },

    // get highest CPI YoY groups (excl. energy/food)
    g_cpiGroups_top(state) {
      if (Array.isArray(state.cpi_groepen)) {
        return dataSortByCol(state.cpi_groepen);
      } return [];
    },

    // house pricess
    g_housePrice_YoY(state) {
      return dataGetLastAsPercentage(state.koopwoningen, 'Prijsindex_ontwikkeling');
    },
    g_housePrice_PPT(state) {
      return dataPptLastToPrev(state.koopwoningen, 'Prijsindex_ontwikkeling');
    },

    // CAO wages
    g_CaoWages_YoY(state) {
      return dataGetLastAsPercentage(state.cao_lonen_mutatie);
    },
    g_CaoWages_PPT(state) {
      return dataPptLastToPrev(state.cao_lonen_mutatie);
    },
  },

  actions: {
    fetchDatasets(url = null) {
      let store = this;
      url = url ? url : import.meta.env.VITE_DATASET_URL;
      // fetch dataset from url
      fetch(url)
        // parse json response
        .then((response) => response.json())
        .then((data) => {
          if (import.meta.env.VITE_THROTTLE_FETCH) {
            setTimeout(() => {
              this.mergeDatasets(data);
            }, 1000);
          } else {
            this.mergeDatasets(data);
          }
        })
        .catch(() => {
          console.error('Could not fetch datasets from: '+url);
        });
    },
    mergeDatasets(data = null) {
      if (!data) { return false; }
      merge(this.$state, data);
      this._ready = true;
      return true;
    }
  },
});