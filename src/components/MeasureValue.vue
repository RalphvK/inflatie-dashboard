<template>
  <div :class="`measure-value font-serif text-${getTextSize} text-${color}`">
    <span v-for="part in getParts" :class="['part', part.type]" v-html="part.content" />
  </div>
</template>

<script>
import { splitValueParts } from "@/helpers/splitValueParts.js";

export default {
  props: {
    value: {
      type: String
    },
    parts: {
      type: Array
    },
    color: {
      type: String,
      default: 'slate-900'
    },
    variant: {
      type: String,
      validator(value) {
        return ['main', 'sub'].includes(value);
      },
      default: 'main'
    },
    textSize: {
      type: String,
      default: null
    }
  },
  computed: {
    getTextSize() {
      if (this.textSize) {
        return this.textSize;
      } else {
        if (this.variant == 'main') {
          return '5xl';
        } else {
          return '2xl';
        }
      }
    },
    getParts() {
      return this.value ? splitValueParts(this.value) : this.parts;
    }
  }
}
</script>

<style scoped lang="scss">
.part {
  @apply font-bold;

  &.currency,
  &.percentage,
  &.percentage-point,
  &.period,
  &.other {
    @apply font-light;
  }

  &.percentage-point {
    font-size: 0.9rem;
  }
}
</style>