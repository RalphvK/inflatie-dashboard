<template>
  <dashboard-widget
    :primary-value="YearOnYear"
    :secondary-value="PptPrevMonth"
    :color-mapping-primary="mapping_YearOnYear_Income"
    icon="bi-file-earmark-ruled-fill">
    <template #primaryTitle>
      CAO lonen
    </template>
    <template #primarySubtitle>
      Jaarmutatie {{ periodTitle }}
    </template>
    <template #secondaryLabel>
      t.o.v. voorgaande maand
    </template>
    <template #rightColumn>
      <chart-area
        :data-series="chartDataSeries"
        :categories="chartCategories"
        :yMax="series ? dataGetMax(seriesCpi.Value) + 10 : 0"
        :yMin="series ? dataGetMin(series.Value) - 10 : 0"
        :x-formatter="ChartXFormatter"
        color="red"
        :color-variant="600"
        :color-secondary="themeColor"
        class="-mb-8 -mt-8"
        height="225px"
      />
    </template>
  </dashboard-widget>
</template>

<script>
import DashboardWidget from '@/components/DashboardWidget.vue';
import ChartArea from '@/components/ChartArea.vue';
import { useDatasets } from '@/store/DatasetsStore.js';
import { mapping_YearOnYear_Income, mapping_PptMonth_Income } from '@/helpers/colorMapping.js';
import { dataToSeries } from '@/helpers/dataToSeries.js';
import { dataGetMax } from '@/helpers/dataGetMax.js';
import { dataGetMin } from '@/helpers/dataGetMin.js';
import { colorMappingDesc } from '@/helpers/colorMapping';
import { getShortYearAndMonth } from '@/helpers/shortMonthDutch.js';
import { getLastPeriodTitle_MY } from '@/helpers/getLastPeriodTitle.js';

export default {
  setup() {
    const datasets = useDatasets();
    return { datasets, mapping_YearOnYear_Income, mapping_PptMonth_Income, dataGetMax, dataGetMin };
  },
  components: {
    DashboardWidget,
    ChartArea
  },
  computed: {
    themeColor() {
      if (!this.datasets._ready) { return 'neutral'; }
      return colorMappingDesc(this.YearOnYear.toFloat(), this.mapping_YearOnYear_Income);
    },
    periodTitle() {
      return getLastPeriodTitle_MY(this.datasets.cao_uurloon);
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
    seriesCpi() {
      if (!this.datasets.cao_uurloon_cpi) { return null; }
      let series = dataToSeries(this.datasets.cao_uurloon_cpi, [
        'Perioden_title',
        'Value'
      ]);
      return series;
    },
    chartDataSeries() {
      if (!this.series || !this.seriesCpi) { return null; }
      return [
        {
          name: 'Prijsindex (2010 = 100)',
          data: this.seriesCpi.Value,
          type: 'line',
        },
        {
          name: 'Uurloon index (2010 = 100)',
          data: this.series.Value,
          type: 'area',
        },
      ]
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