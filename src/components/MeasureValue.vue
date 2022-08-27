<template>
  <div :class="`measure-value font-serif text-${getTextSize} text-${color}`" v-if="hasValue">
    <span v-for="part in getParts" :class="['part', part.type]" v-html="part.value" />
  </div>
  <div v-if="!hasValue">
    <skeleton-box :width="skeletonWidth" />
  </div>
</template>

<script>
import SkeletonBox from "@/components/SkeletonBox.vue";
import { isObject, isString, isEmpty } from "lodash";

export default {
  props: {
    value: {
      type: [String, Object]
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
    },
    skeletonWidth: {
      default: 100
    }
  },
  components: {
    SkeletonBox
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
    },
    hasValue() {
      return (
        typeof this.value !== 'undefined'
        && this.value !== null
        && !isEmpty(this.value)
      )
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

  &.percentage-point-symbol {
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 2px;
    letter-spacing: -0.5px;
  }
}
</style>