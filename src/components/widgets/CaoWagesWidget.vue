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
  </dashboard-widget>
</template>

<script setup>
import { useDatasets } from '@/store/DatasetsStore.js';
import { mapping_YearOnYear_Income, mapping_PptMonth_Income } from '@/helpers/colorMapping.js';
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