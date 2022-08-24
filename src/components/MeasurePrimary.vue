<template>
    <div class="flex gap-x-4 items-center">
      <measure-icon
        v-if="icon"
        :icon="icon"
        :background-color="color + '-600'"
        :icon-class="iconClass" />
      <measure-value :value="value" :color="color + '-900'" variant="main" />
      <measure-ticker-symbol
        class="-ml-2"
        :symbol="tickerSymbol"
        :color="color + '-600'"
        v-if="tickerSymbol" />
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
    iconClass: {
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
    },
    color: {
      type: String,
      default: "slate"
    }
  }
}
</script>