<template>
  <div class="measure">

    <div class="main-measure flex gap-x-4 items-center">
      <measure-icon :icon="icon" background="slate-500" />
      <measure-value :value="value" />
      <measure-ticker-symbol class="-ml-2" :symbol="tickerSymbol" v-if="tickerSymbol" />
    </div>

    <div class="secondary-measure">
      <div class="secondary-measure-value"></div>
      <div class="secondary-measure-remark"></div>
    </div>

  </div>
</template>

<script>
import MeasureIcon from '@/components/MeasureIcon.vue';
import MeasureValue from '@/components/MeasureValue.vue';
import MeasureTickerSymbol from '@/components/MeasureTickerSymbol.vue';

export default {
  components: {
    MeasureIcon,
    MeasureValue,
    MeasureTickerSymbol
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    value: {
      type: String,
      required: true
    },
    tickerSymbol: {
      type: String,
      default: false
    }
  }
}
</script>