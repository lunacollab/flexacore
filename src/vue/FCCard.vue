<template>
  <div :class="classes">
    <div class="fc-card-header" v-if="header || showHeader">
      <h5 class="fc-card-title">{{ header }}</h5>
      <slot name="header" />
    </div>
    <div class="fc-card-body">
      <slot />
    </div>
    <div class="fc-card-footer" v-if="footer || showFooter">
      <slot name="footer" />
      <span v-if="footer">{{ footer }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  header: { type: String, default: '' },
  footer: { type: String, default: '' },
  variant: { type: String, default: 'light' },
  border: { type: Boolean, default: true },
  shadow: { type: Boolean, default: false },
  showHeader: { type: Boolean, default: false },
  showFooter: { type: Boolean, default: false }
})
const classes = [
  'fc-card',
  `fc-card-${props.variant}`,
  props.border ? 'fc-card-border' : '',
  props.shadow ? 'fc-card-shadow' : ''
]
</script> 