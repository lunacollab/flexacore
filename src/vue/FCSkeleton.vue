<template>
  <div :class="classes" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: 'text' },
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  animated: { type: Boolean, default: true }
})
const classes = [
  'fc-skeleton',
  `fc-skeleton-${props.variant}`,
  props.animated ? 'fc-skeleton-animated' : ''
]
</script> 