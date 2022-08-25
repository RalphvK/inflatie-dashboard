<template>
  <dashboard-card color="red">
    <div class="flex flex-col sm:flex-row">

      <!-- left column -->
      <div class="col flex flex-col gap-5">
        <widget-title color="red">
          <template #default>
          Consumentenprijsindex (CPI)
          </template>
          <template #subtitle>
            Stijging consumentenprijzen t.o.v. juli 2021
          </template>
        </widget-title>

        <measure-primary
          icon="bi-cash-coin"
          icon-class="mt-2"
          :value="CpiYtd"
          tickerSymbol="up"
          color="red"
        >
        </measure-primary>
        
        <measure-secondary :value="PctPointPrevMonth" color="red">
          t.o.v. voorgaande maand
        </measure-secondary>
      </div>

      <!-- right column -->
      <div class="col">
        Visualisation will go here
      </div>

    </div>
  </dashboard-card>
</template>

<script setup>
  import {useDatasets} from '@/store/DatasetsStore.js';
  const datasets = useDatasets();
</script>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';
import MeasurePrimary from '@/components/MeasurePrimary.vue';
import MeasureSecondary from '@/components/MeasureSecondary.vue';
import { sentientNumber } from '../../helpers/sentientNumbers';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MeasurePrimary,
    MeasureSecondary
  },
  computed: {
    CpiYtd() {
      return new sentientNumber(this.datasets.getCpiYtd);
    },
    PctPointPrevMonth() {
      return new sentientNumber(this.datasets.getCpiPercentagePointIncreaseToMonth);
    }
  }
}
</script>