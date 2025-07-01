<template>
  <div :class="classes" role="alert">
    <div class="fc-alert-content">
      <slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="fc-alert-close"
      @click="$emit('dismiss')"
      aria-label="Đóng"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: 'info' },
  dismissible: { type: Boolean, default: false }
})
const classes = [
  'fc-alert',
  `fc-alert-${props.variant}`,
  props.dismissible ? 'fc-alert-dismissible' : ''
]
</script> 