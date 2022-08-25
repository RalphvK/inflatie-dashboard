<template>
  <div :class="`measure-value font-serif text-${getTextSize} text-${color}`">
    <span v-for="part in getParts" :class="['part', part.type]" v-html="part.value" />
  </div>
</template>

<script>
import { splitValueParts } from "@/helpers/splitValueParts.js";
import { isObject, isString } from "@vue/shared";

export default {
  props: {
    value: {
      type: [String, Object],
      required: true
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
      if (isObject(this.value)) {
        return this.value.toParts();
      } else {
        return [
          {
            type: 'direct-string',
            value: this.value
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.part {
  @apply font-light;

  &.integral,
  &.fractional,
  &.decimal-separator {
    @apply font-bold;
  }

  &.percentage-point {
    font-size: 0.9rem;
  }
}
</style>