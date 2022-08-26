<template>
  <dashboard-card :color="themeColor">
    <div class="flex flex-col md:flex-row gap-5">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title :color="themeColor">
          <template #default>
          CPI voedingsmiddelen
          </template>
          <template #subtitle>
            Prijstijging voedingsmiddelen juli 2021 - 2022
          </template>
        </widget-title>

        <measure-primary
          icon="bi-cash-coin"
          icon-class="mt-2"
          :value="CpiYtd"
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
import { getTickerSymbol } from '@/helpers/getTickerSymbol.js';

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
      return colorMappingDesc(this.CpiYtd.intValue, [
        {min: 5, color: THEME.danger},
        {min: 3, color: THEME.warning},
        {min: 1, color: THEME.success},
        {min: 0, color: THEME.warning},
      ], THEME.danger);
    },
    CpiYtd() {
      return this.datasets.g_cpiFood_YTD;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiFood_PPT;
    },
    tickerSymbol() {
      return getTickerSymbol(this.CpiYtd);
    }
  }
}
</script>