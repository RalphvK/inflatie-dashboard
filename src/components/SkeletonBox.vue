<template>
  <div class="skeleton-box bg-slate-400/20 p-2 rounded-md animate-pulse">
    &nbsp;
  </div>
</template>

<script>
import { isString } from 'lodash';

export default {
  props: {
    width: {
      type: [String, Number],
      default: 100
    },
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  computed: {
    getWidth() {
      return isString(this.width) ? this.width : String(this.width) + 'px';
    },
    getHeight() {
      return isString(this.height) ? this.height : String(this.height) + 'px';
    }
  }
}
</script>

<style scoped>
.skeleton-box {
  width: v-bind(getWidth);
  height: v-bind(getHeight);
  max-width: 100%;
}
</style>