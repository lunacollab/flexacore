<template>
  <button :class="classes" :type="type" @click="$emit('click', $event)"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FcButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    classes(): string[] {
      return [
        'fc-btn',
        `fc-btn-${this.variant}`
      ];
    }
  }
});
</script> 