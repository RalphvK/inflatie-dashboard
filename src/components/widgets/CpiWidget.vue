<template>
  <dashboard-card>
    <div class="flex flex-col md:flex-row gap-5 h-full">

      <!-- left column -->
      <div class="col flex flex-col gap-5 min-w-max justify-between">
        <widget-title :color="themeColor">
          <template #default>
          Consumentenprijsindex (CPI)
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

      <!-- right column -->
      <div class="col flex-grow">
        <!-- <apexchart class="-mb-12 -mt-8" type="area" height="240" width="100%" :options="chartOptions" :series="seriesValues" v-if="datasets.cpi"></apexchart> -->
        <chart-area
          :data-series="chartDataSeries"
          :categories="chartCategories"
          :yMax="series ? dataGetMax(series.Value) : 0"
          :x-formatter="ChartXFormatter"
          :color="themeColor"
        />
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
import ChartArea from '@/components/ChartArea.vue';
import { dataToSeries } from '@/helpers/dataToSeries.js';
import { dataGetMax } from '@/helpers/dataGetMax.js';
import { getShortYearAndMonth } from '@/helpers/shortMonthDutch.js';
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
      return colorMappingDesc(this.CpiYoY.getFloat());
    },
    CpiYoY() {
      return this.datasets.g_cpi_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpi_PPT;
    },
    tickerSymbol() {
      return getTickerSymbol(this.CpiYoY);
    },
    series() {
      if (!this.datasets.cpi) { return null; }
      let series = dataToSeries(this.datasets.cpi, [
        'Perioden_title',
        'Value'
      ]);
      return series;
    },
    chartDataSeries() {
      if (!this.series) { return null; }
      return [{
        name: 'Jaarmutatie CPI',
        data: this.series.Value
      }]
    },
    chartCategories() {
      if (!this.series) { return null; }
      return this.series.Perioden_title;
    }
  },
  methods: {
    ChartXFormatter(value) {
      return getShortYearAndMonth(value);
    }
  }
}
</script>