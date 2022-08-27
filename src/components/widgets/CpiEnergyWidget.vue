<template>
  <dashboard-card :color="themeColor">
    <div class="flex flex-col md:flex-row gap-5">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title :color="themeColor">
          <template #default>
          CPI Energie
          </template>
          <template #subtitle>
            Jaarmutatie juli 2022
          </template>
        </widget-title>

        <measure-primary
          icon="bi-cash-coin"
          icon-class="mt-2"
          :value="CpiYoY"
          :tickerSymbol="tickerSymbol"
          :color="themeColor"
        >
        </measure-primary>
        
        <measure-secondary :value="PptPrevMonth" :color="themeColor">
          t.o.v. voorgaande maand
        </measure-secondary>
      </div>

    </div>
  </dashboard-card>
</template>

<script setup>
  import {useDatasets} from '@/store/DatasetsStore.js';
  const datasets = useDatasets();
</script>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';
import MeasurePrimary from '@/components/MeasurePrimary.vue';
import MeasureSecondary from '@/components/MeasureSecondary.vue';
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { THEME } from '@/config/constants.js';
import { getTickerSymbol } from '@/helpers/getTickerSymbol';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MeasurePrimary,
    MeasureSecondary
  },
  computed: {
    themeColor() {
      if (!this.datasets._ready) { return 'neutral'; }
      return colorMappingDesc(this.CpiYoY.intValue);
    },
    CpiYoY() {
      return this.datasets.g_cpiEnergy_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiEnergy_PPT;
    },
    tickerSymbol() {
      return getTickerSymbol(this.CpiYoY);
    }
  }
}
</script>