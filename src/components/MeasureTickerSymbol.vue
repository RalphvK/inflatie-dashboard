<template>
  <div :class="['ticker-symbol', 'text-3xl', 'flex', 'items-center', 'text-'+color]">
    <i class="bi bi-caret-up-fill" v-if="symbol == 'up'"></i>
    <i class="bi bi-caret-down-fill" v-if="symbol == 'down'"></i>
    <i :class="['neutral-icon', 'bg-'+color]" v-if="symbol == 'neutral'"></i>
  </div>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'slate-500'
    }
  }
}
</script>

<style scoped lang="scss">
.neutral-icon {
  width: 20px;
  height: 5px;
  border-radius: 2px;
  display: inline-block;
}
</style>