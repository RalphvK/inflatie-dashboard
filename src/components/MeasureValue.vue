<template>
  <div :class="`measure-value font-serif text-${getTextSize} text-${color}`">
    <span v-for="part in parts" :class="part.type" v-html="part.content" />
  </div>
</template>

<script>
import { isDigitChar } from "@/helpers/isDigitChar.js";

export default {
  props: {
    value: {
      type: String,
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
    parts() {
      // if value length is less than 1, return empty array
      if (!this.value.length) { return []; }
      let parts = [];
      let i = 0;
      let currentPart = '';
      let currentPartType = null;
      // iterate through string
      for (let i = 0; i < this.value.length; i++) {
        // check if current character is a number
        let type = isDigitChar(this.value[i]) ? 'number' : 'other';
        // if this character is of the same type as the current part, append
        if (type == currentPartType || i == 0) {
          currentPart += this.value[i];
        // if this char is not of the same type, push the part to the list
        } else {
          parts.push({
            type: currentPartType,
            content: currentPart
          });
          // then start over and set the currentPart to this character
          currentPart = this.value[i];
        }
        // then set currentPartType to the new type
        currentPartType = type;
      }
      // add final part to list if not yet added
      if (currentPart !== '') {
        parts.push({
          type: currentPartType,
          content: currentPart
        });
      }
      return parts;
    }
  }
}
</script>

<style scoped lang="scss">
.number {
  @apply font-bold;
}
.other {
  @apply font-light;
}
</style>