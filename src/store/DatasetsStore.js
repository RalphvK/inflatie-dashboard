import { defineStore } from "pinia";
import { last, merge, round } from "lodash";
import { SentientPercentage, SentientPercentagePoint } from '@/helpers/SentientNumbers';

export const useDatasets = defineStore({
  id: 'datasets',

  state: () => ({
    _ready: false,
    cpi: null
  }),

  getters: {
    getCpiYtd(state) {
      let lastRow = last(state.cpi) ?? null;
      return lastRow
        ? new SentientPercentage(lastRow.Value)
        : '-'
    },
    getCpiPercentagePointIncreaseToMonth(state) {
      // check if data is present and more than 1 element
      if (Array.isArray(state.cpi) && state.cpi.length > 0) {
        let lastValue = state.cpi[state.cpi.length - 1].Value;
        let prevValue = state.cpi[state.cpi.length - 2].Value;
        return new SentientPercentagePoint(round(lastValue - prevValue, 1));
      } else {
        return '-';
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
          store._ready = true;
        })
        .catch(() => {
          console.error('Could not fetch datasets!');
        });
    },
  },
});