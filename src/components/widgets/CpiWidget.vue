<template>
  <dashboard-card>
    <widget-title>
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