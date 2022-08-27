<template>
  <div :class="['icon-circle', 'bg-'+backgroundColor, 'text-'+foregroundColor]">
    <i :class="['bi', icon, iconClass]"></i>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: 'slate-500'
    },
    foregroundColor: {
      type: String,
      default: 'white'
    },
    iconSize: {
      type: String,
      default: '1.6rem'
    }
  }
}
</script>

<style scoped lang="scss">
.icon-circle {
  @apply flex justify-center items-center rounded-full;
  overflow: hidden;
  width: 48px;
  height: 48px;
  min-width: 48px;

  i {
    font-size: v-bind(iconSize);
  }
}
</style>