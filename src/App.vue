<template>
  <router-view></router-view>
</template>

<script setup>
  import { useDatasets } from '@/store/DatasetsStore.js';
  const datasets = useDatasets();
</script>

<script>
export default {
  mounted() {
    this.datasets.fetchDatasets();
  }
}
</script>