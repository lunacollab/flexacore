<template>
  <div class="fc-progress">
    <div
      class="fc-progress-bar"
      :class="'fc-progress-bar-' + variant"
      :style="{ width: value + '%' }"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span class="fc-progress-text" v-if="showLabel">{{ value }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: { type: Number, default: 0 },
  variant: { type: String, default: 'primary' },
  showLabel: { type: Boolean, default: false }
})
</script> 