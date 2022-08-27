<template>
  <td :class="`pr-2 py-2 flex pl-${paddingSize}`">
    <measure-ticker-symbol
      class="-mt-1 mr-1"
      :symbol="tickerSymbol"
      :color="themeColor + '-600'"
      v-if="tickerSymbol"
      size="sm"
    />
    <measure-value
      variant="sub"
      :value="item.value"
      textSize="base"
      :color="themeColor + '-900'"
    />
  </td>
  <td :class="`pr-${paddingSize}`">
    <div :class="`text-${labelFontSize} text-regular text-${themeColor}-900`">
      {{ item.name }}
    </div>
  </td>
</template>

<script>
import MeasureValue from '@/components/MeasureValue.vue';
import MeasureTickerSymbol from '@/components/MeasureTickerSymbol.vue';
import { colorMappingDesc } from '@/helpers/colorMapping.js';
import { getTickerSymbol } from '@/helpers/getTickerSymbol.js';

export default {
  props: {
    item: {
      type: Object
    },
    paddingSize: {
      type: String
    }
  },
  components: {
    MeasureValue,
    MeasureTickerSymbol
  },
  computed: {
    themeColor() {
      if (!this.item) { return 'neutral'; }
      return colorMappingDesc(this.item.value.getFloat());
    },
    tickerSymbol() {
      return getTickerSymbol(this.item.value);
    },
    labelFontSize() {
      // if length is less than 23 chars, use size 'sm'
      if (!this.item || this.item.name.length <= 22) {
        return 'sm';
      // if more than 22 chars, use xs
      } else {
        return 'xs'
      }
    }
  }
}
</script>