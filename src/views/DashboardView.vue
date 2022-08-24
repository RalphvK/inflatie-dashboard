<template>
  <div class="flex w-100 min-h-screen bg-slate-200 p-10">
    <div class="container mx-auto bg-slate-100 rounded-3xl p-5 shadow-3xl-c shadow-slate-900/10">
      <div class="grid justify-items-stretch">
        <cpi-widget></cpi-widget>
      </div>
    </div>
  </div>
</template>

<script>
import CpiWidget from '@/components/widgets/CpiWidget.vue';

export default {
  components: {
    CpiWidget
  }
}
</script>