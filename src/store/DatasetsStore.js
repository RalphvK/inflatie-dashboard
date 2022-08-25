import { defineStore } from "pinia";
import { last, merge, round } from "lodash";

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    test: 'test string',
    cpi: null
  }),

  getters: {
    getCpiYtd(state) {
      let lastRow = last(state.cpi) ?? null;
      return lastRow ? lastRow.Value : 0;
    },
    getCpiPercentagePointIncreaseToMonth(state) {
      // check if data is present and more than 1 element
      if (Array.isArray(state.cpi) && state.cpi.length > 0) {
        let lastValue = state.cpi[state.cpi.length - 1].Value;
        let prevValue = state.cpi[state.cpi.length - 2].Value;
        return round(lastValue - prevValue, 1);
      } else {
        return 0;
      }
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
          merge(store.$state, data);
        })
        .catch(() => {
          console.error('Could not fetch datasets!');
        });
    },
  },
});