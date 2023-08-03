<template>
  <dashboard-widget
    :primary-value="CpiYoY"
    :secondary-value="PptPrevMonth"
    :color-mapping-primary="mapping_YearOnYear_Energy"
    icon="bi-fire">
    <template #primaryTitle>
      CPI Energie
    </template>
    <template #primarySubtitle>
      Jaarmutatie {{ periodTitle }}
    </template>
    <template #secondaryLabel>
      t.o.v. voorgaande maand
    </template>
  </dashboard-widget>
</template>

<script>
import DashboardWidget from '@/components/DashboardWidget.vue';
import { useDatasets } from '@/store/DatasetsStore.js';
import { mapping_YearOnYear_Energy } from '@/helpers/colorMapping.js';
import { getLastPeriodTitle_MY } from '@/helpers/getLastPeriodTitle.js';

export default {
  setup() {
    const datasets = useDatasets();
    return { datasets, mapping_YearOnYear_Energy };
  },
  components: {
    DashboardWidget
  },
  computed: {
    CpiYoY() {
      return this.datasets.g_cpiEnergy_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiEnergy_PPT;
    },
    periodTitle() {
      return getLastPeriodTitle_MY(this.datasets.cpi_energie);
    },
  }
}
</script>