<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  pill: { type: Boolean, default: false }
})
const classes = [
  'fc-badge',
  `fc-badge-${props.variant}`,
  `fc-badge-${props.size}`,
  props.pill ? 'fc-badge-pill' : ''
]
</script> 