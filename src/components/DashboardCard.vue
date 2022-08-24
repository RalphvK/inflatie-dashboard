<template>
  <div :class="['rounded-xl', `bg-${backgroundColor}`, 'p-7']">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: 'slate-50'
      }
    }
  }
</script>