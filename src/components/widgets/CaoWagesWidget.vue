<template>
  <dashboard-widget
    :primary-value="YearOnYear"
    :secondary-value="PptPrevMonth"
    :color-mapping-primary="mapping_YearOnYear_Income"
    :color-mapping-secondary="mapping_PptMonth_Income"
    icon="bi-file-earmark-ruled-fill">
    <template #primaryTitle>
      CAO lonen
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
        :yMax="200"
        :x-formatter="ChartXFormatter"
        :color="themeColor"
      />
    </template>
  </dashboard-widget>
</template>

<script setup>
import { useDatasets } from '@/store/DatasetsStore.js';
import { mapping_YearOnYear_Income, mapping_PptMonth_Income } from '@/helpers/colorMapping.js';
import { dataGetMax } from '@/helpers/dataGetMax.js';
const datasets = useDatasets();
</script>

<script>
import DashboardWidget from '@/components/DashboardWidget.vue';
import ChartArea from '@/components/ChartArea.vue';
import { dataToSeries } from '@/helpers/dataToSeries.js';
import { colorMappingDesc } from '@/helpers/colorMapping';
import { getShortYearAndMonth } from '@/helpers/shortMonthDutch.js';

export default {
  components: {
    DashboardWidget,
    ChartArea
  },
  computed: {
    themeColor() {
      if (!this.datasets._ready) { return 'neutral'; }
      return colorMappingDesc(this.YearOnYear.getFloat(), this.mapping_YearOnYear_Income);
    },
    YearOnYear() {
      return this.datasets.g_CaoWages_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_CaoWages_PPT;
    },
    series() {
      if (!this.datasets.cao_uurloon) { return null; }
      let series = dataToSeries(this.datasets.cao_uurloon, [
        'Perioden_title',
        'Value'
      ]);
      return series;
    },
    chartDataSeries() {
      if (!this.series) { return null; }
      return [{
        name: 'Uurloon index (2010 = 100)',
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