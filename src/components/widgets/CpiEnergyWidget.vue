<template>
  <dashboard-widget
    :primary-value="CpiYoY"
    :secondary-value="PptPrevMonth"
    icon="bi-fire">
    <template #primaryTitle>
      CPI Energie
    </template>
    <template #primarySubtitle>
      Jaarmutatie juli 2022
    </template>
    <template #secondaryLabel>
      t.o.v. voorgaande maand
    </template>
  </dashboard-widget>
</template>

<script setup>
import { useDatasets } from '@/store/DatasetsStore.js';
const datasets = useDatasets();
</script>

<script>
import DashboardWidget from '@/components/DashboardWidget.vue';

export default {
  components: {
    DashboardWidget
  },
  computed: {
    CpiYoY() {
      return this.datasets.g_cpiEnergy_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_cpiEnergy_PPT;
    }
  }
}
</script>