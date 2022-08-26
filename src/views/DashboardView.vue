<template>
  <div class="flex w-100 min-h-screen bg-slate-200 p-10">
    <div class="container mx-auto bg-slate-100 rounded-3xl p-5 shadow-3xl-c shadow-slate-900/10">
      <div class="grid justify-items-stretch gap-5 lg:grid-cols-3 md:grid-cols:2">
        <cpi-widget class="col-span-3"></cpi-widget>
        <cpi-energy-widget></cpi-energy-widget>
        <cpi-food-widget></cpi-food-widget>
        <cpi-energy-widget></cpi-energy-widget>
      </div>
    </div>
  </div>
</template>

<script>
import CpiWidget from '@/components/widgets/CpiWidget.vue';
import CpiEnergyWidget from '@/components/widgets/CpiEnergyWidget.vue';
import CpiFoodWidget from '@/components/widgets/CpiFoodWidget.vue';

export default {
  components: {
    CpiWidget,
    CpiEnergyWidget,
    CpiFoodWidget
  }
}
</script>