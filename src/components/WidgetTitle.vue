<template>
  <div class="widget-title">
    <h3 :class="`font-medium text-lg text-${color}-900`">
      <slot name="default"></slot>
    </h3>
    <span :class="`font-medium text-sm text-${color}-900`">
      <slot name="subtitle"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'slate'
    }
  }
}
</script>