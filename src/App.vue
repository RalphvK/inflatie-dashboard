<template>
  <router-view></router-view>
</template>

<script>
import { useDatasets } from '@/store/DatasetsStore.js';

export default {
  setup() {
    const datasets = useDatasets();
    return { datasets };
  },
  mounted() {
    this.datasets.fetchDatasets();
  }
}
</script>