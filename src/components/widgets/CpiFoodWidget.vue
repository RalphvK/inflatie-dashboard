<template>
  <dashboard-widget
    :primary-value="CpiYoY"
    :secondary-value="PptPrevMonth"
    icon="bi-basket2-fill">
    <template #primaryTitle>
      CPI voedingsmiddelen
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
import { getLastPeriodTitle_MY } from '@/helpers/getLastPeriodTitle.js';

export default {
  setup() {
    const datasets = useDatasets();
    return { datasets };
  },
  components: {
    DashboardWidget
  },
  computed: {
    CpiYoY() {
      return this.datasets.g_cpiFood_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiFood_PPT;
    },
    periodTitle() {
      return getLastPeriodTitle_MY(this.datasets.cpi_voedingsmiddelen);
    },
  }
}
</script>