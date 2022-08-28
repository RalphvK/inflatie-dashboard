<template>
  <dashboard-card>
    <div class="flex flex-col md:flex-row gap-5 h-full">

      <!-- left column -->
      <div class="col flex flex-col gap-5 justify-between">
        <widget-title :color="themeColor">
          <template #default>
          CPI voedingsmiddelen
          </template>
          <template #subtitle>
            Jaarmutatie juli 2022
          </template>
        </widget-title>

        <measure-primary
          icon="bi-basket2-fill"
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
      return colorMappingDesc(this.CpiYoY.intValue);
    },
    CpiYoY() {
      return this.datasets.g_cpiFood_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiFood_PPT;
    },
    tickerSymbol() {
      return getTickerSymbol(this.CpiYoY);
    }
  }
}
</script>