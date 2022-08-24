<template>
  <div :class="classList">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: 'slate'
      },
      backgroundOpacity: {
        type: Number,
        default: 100
      },
      shadowOpacity: {
        type: Number,
        default: 20
      }
    },
    computed: {
      classList() {
        let clsList = ['rounded-xl', `bg-${this.color}-50/${this.backgroundOpacity}`, 'p-7', 'shadow-3xl-c'];
        clsList.push(`shadow-${this.color}-800/${this.shadowOpacity}`);
        return clsList;
      }
    }
  }
</script>