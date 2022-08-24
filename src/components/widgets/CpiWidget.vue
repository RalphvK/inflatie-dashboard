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
      icon="bi-cash"
      value="12,5%"
      tickerSymbol="neutral"
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