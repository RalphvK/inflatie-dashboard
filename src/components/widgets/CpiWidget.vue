<template>
  <dashboard-card color="red">
    <div class="flex flex-col sm:flex-row">

      <!-- left column -->
      <div class="col">
        <widget-title color="red">
          <template #default>
          Consumentenprijsindex (CPI)
          </template>
          <template #subtitle>
            Stijging consumentenprijzen t.o.v. juli 2021
          </template>
        </widget-title>
        <widget-measure
          icon="bi-cash-coin"
          icon-class="mt-2"
          value="12,5%"
          tickerSymbol="up"
          color="red"
        >
        </widget-measure>
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
import WidgetMeasure from '@/components/WidgetMeasure.vue';

export default {
  components: {
    DashboardCard,
    WidgetTitle,
    WidgetMeasure
  }
}
</script>