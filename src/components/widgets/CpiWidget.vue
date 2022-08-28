<template>
  <dashboard-widget
    :primary-value="CpiYoY"
    :secondary-value="PptPrevMonth"
    icon="bi-cash-coin"
    icon-class="mt-2">
    <template #primaryTitle>
      Consumentenprijsindex (HICP)
    </template>
    <template #primarySubtitle>
      Jaarmutatie juli 2022
    </template>
    <template #secondaryLabel>
      t.o.v. voorgaande maand
    </template>
    <template #rightColumn>
      <chart-area
        :data-series="chartDataSeries"
        :categories="chartCategories"
        :yMax="series ? dataGetMax(series.Value) : 0"
        :x-formatter="ChartXFormatter"
        :color="themeColor"
      />
    </template>
  </dashboard-widget>
</template>

<script setup>
import { useDatasets } from '@/store/DatasetsStore.js';
const datasets = useDatasets();
</script>

<script>
import DashboardWidget from '@/components/DashboardWidget.vue';
import ChartArea from '@/components/ChartArea.vue';
import { dataToSeries } from '@/helpers/dataToSeries.js';
import { dataGetMax } from '@/helpers/dataGetMax.js';
import { getShortYearAndMonth } from '@/helpers/shortMonthDutch.js';
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { THEME } from '@/config/constants.js';
import { getTickerSymbol } from '@/helpers/getTickerSymbol';

export default {
  components: {
    DashboardWidget
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