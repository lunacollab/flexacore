<template>
  <form :class="classes" @submit.prevent="$emit('submit', $event)">
    <slot />
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  layout: { type: String, default: 'vertical' },
  novalidate: { type: Boolean, default: true }
})
const classes = [
  'fc-form',
  `fc-form-${props.layout}`
]
</script> 