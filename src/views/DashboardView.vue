<template>
  <div class="flex w-100 min-h-screen bg-slate-200 sm:p-10">
    <div class="container my-auto mx-auto bg-slate-100 sm:rounded-3xl p-5 shadow-3xl-c shadow-slate-900/10">
      <div class="grid justify-items-stretch gap-5 lg:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
        <cpi-widget class="lg:col-span-3 sm:col-span-2 sm:col-span-1"></cpi-widget>
        <cpi-energy-widget />
        <cpi-food-widget />
        <cpi-groups-widget />
        <house-price-widget />
        <cao-wages-widget class="lg:col-span-2 sm:col-span-2 sm:col-span-1" />
      </div>
    </div>
  </div>
</template>

<script>
import CpiWidget from '@/components/widgets/CpiWidget.vue';
import CpiEnergyWidget from '@/components/widgets/CpiEnergyWidget.vue';
import CpiFoodWidget from '@/components/widgets/CpiFoodWidget.vue';
import CpiGroupsWidget from '@/components/widgets/CpiGroupsWidget.vue';
import HousePriceWidget from '@/components/widgets/HousePriceWidget.vue';
import CaoWagesWidget from '@/components/widgets/CaoWagesWidget.vue';

export default {
  components: {
    CpiWidget,
    CpiEnergyWidget,
    CpiFoodWidget,
    CpiGroupsWidget,
    HousePriceWidget,
    CaoWagesWidget
  }
}
</script>