<template>
  <dashboard-card :color="themeColor">
    <div class="flex flex-col md:flex-row gap-5">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title :color="themeColor">
          <template #default>
          Consumentenprijsindex (CPI)
          </template>
          <template #subtitle>
            Stijging consumentenprijzen t.o.v. juli 2021
          </template>
        </widget-title>

        <measure-primary
          icon="bi-cash-coin"
          icon-class="mt-2"
          :value="CpiYtd"
          tickerSymbol="up"
          :color="themeColor"
        >
        </measure-primary>
        
        <measure-secondary :value="PctPointPrevMonth" :color="themeColor">
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
      return this.datasets.getCpiYtd;
    },
    PctPointPrevMonth() {
      return this.datasets.getCpiPercentagePointIncreaseToMonth;
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