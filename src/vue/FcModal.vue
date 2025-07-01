<template>
  <div :class="['fc-modal', open ? 'fc-modal-active' : '']" tabindex="-1" role="dialog" aria-modal="true" @click="onBackdrop">
    <div class="fc-modal-content">
      <slot />
      <button class="fc-modal-close" @click="$emit('close')" type="button" aria-label="Đóng">×</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FcModal',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBackdrop(e: MouseEvent) {
      if (e.target === e.currentTarget) this.$emit('close');
    }
  }
});
</script> 