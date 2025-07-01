<template>
  <div :class="classes" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="fc-toast-header">
      <strong class="fc-toast-title">{{ title }}</strong>
      <button type="button" class="fc-toast-close" @click="$emit('close')" aria-label="Đóng">×</button>
    </div>
    <div class="fc-toast-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'success' | 'danger' | 'warning' | 'info',
  title?: string,
  autoClose?: boolean,
  delay?: number
}>()
const props = defineProps({
  variant: { type: String, default: 'info' },
  title: { type: String, default: '' },
  autoClose: { type: Boolean, default: true },
  delay: { type: Number, default: 5000 }
})
const classes = [
  'fc-toast',
  `fc-toast-${props.variant}`
]
</script> 