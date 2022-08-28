<template>
  <dashboard-widget
    :primary-value="YearOnYear"
    :secondary-value="PptPrevMonth"
    icon="bi-house-fill">
    <template #primaryTitle>
      CAO lonen
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
    YearOnYear() {
      return this.datasets.g_CaoWages_YoY;
    },
    PptPrevMonth() {
      return this.datasets.g_CaoWages_PPT;
    }
  }
}
</script>