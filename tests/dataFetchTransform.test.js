import { describe, assert, it, expect, toMatchSnapshot } from "vitest";
import { useDatasets } from "../src/store/DatasetsStore";
import { setActivePinia, createPinia } from 'pinia';
import * as datasetsData from './data/dashboard_datasets.json';

import { dataGetLastAsPercentage } from '@/helpers/dataGetLast.js';
import _ from "lodash";
import { getLastPeriodTitle_MY } from "../src/helpers/getLastPeriodTitle";

setActivePinia(createPinia());
const datasetsStore = useDatasets();

describe('datasetsStore', () => {
  
  it('fetchDatasets', () => {
    datasetsStore.mergeDatasets(datasetsData);
    expect(datasetsStore._ready).toEqual(true);
    expect(datasetsStore.cpi).toSatisfy(function(value) {
      if (!Array.isArray(value)) { return false; }
      if (value.length < 12) { return false; }
      return true;
    });
    console.log(datasetsStore.cpi);
  });

  it('getters', () => {
    expect(datasetsStore.g_cpi_YoY).toMatchSnapshot();
    expect(datasetsStore.g_cpi_PPT).toMatchSnapshot();
    expect(datasetsStore.g_cpiEnergy_YoY).toMatchSnapshot();
    expect(datasetsStore.g_cpiEnergy_PPT).toMatchSnapshot();
    expect(datasetsStore.g_cpiFood_YoY).toMatchSnapshot();
    expect(datasetsStore.g_cpiFood_PPT).toMatchSnapshot();
    expect(datasetsStore.g_cpiGroups_top).toMatchSnapshot();
  });

});

describe('getLastPeriodTitle', () => {

  it('getLastPeriodTitle_MY', () => {
    expect(getLastPeriodTitle_MY(datasetsStore.cpi)).toEqual('juli 2022');
  });

});
