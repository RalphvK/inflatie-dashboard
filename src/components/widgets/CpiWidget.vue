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
  </dashboard-card>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import WidgetTitle from '@/components/WidgetTitle.vue';

export default {
  components: {
    DashboardCard,
    WidgetTitle
  }
}
</script>