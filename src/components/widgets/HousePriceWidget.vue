<template>
  <dashboard-widget
    :primary-value="PriceYoY"
    :secondary-value="PptPrevMonth"
    icon="bi-house-fill">
    <template #primaryTitle>
      Koopwoningen
    </template>
    <template #primarySubtitle>
      Jaarmutatie gem. verkoopprijs {{ periodTitle }}
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
    PriceYoY() {
      return this.datasets.g_housePrice_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_housePrice_PPT;
    },
    periodTitle() {
      return getLastPeriodTitle_MY(this.datasets.koopwoningen);
    },
  }
}
</script>