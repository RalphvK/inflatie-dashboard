<template>
  <div class="measure-secondary flex items-baseline gap-2">
    <measure-value
      :value="value"
      variant="sub"
      :show-plus="showPlus"
      :color="color + '-900'"
      skeleton-width="50px" />
    <div :class="`description text-sm font-serif font-medium text-${color}-900/80`">
     <slot></slot>
    </div>
  </div>
</template>

<script>
import MeasureValue from '@/components/MeasureValue.vue';

export default {
  components: {
    MeasureValue
  },
  props: {
    value: {
      type: [String, Object],
      required: true
    },
    color: {
      color: String,
      default: 'slate'
    },
    showPlus: {
      type: Boolean,
      default: false
    }
  }
}
</script>