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

        <main-measure
          icon="bi-cash-coin"
          icon-class="mt-2"
          value="12,5%"
          tickerSymbol="up"
          color="red"
        >
        </main-measure>
        
        <sub-measure value="+2,5pt" color="red">
          t.o.v. voorgaande maand
        </sub-measure>
      </div>

      <!-- right column -->
      <div class="col">
        Visualisation will go here
      </div>

    </div>
  </dashboard-card>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';
import MainMeasure from '@/components/MainMeasure.vue';
import SubMeasure from '@/components/SubMeasure.vue';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    MainMeasure,
    SubMeasure
  }
}
</script>