<template>
  <div
    :class="['fc-tooltip', show ? 'fc-tooltip-show' : '']"
    role="tooltip"
    v-show="show"
  >
    {{ content }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: { type: String, default: '' },
  placement: { type: String, default: 'top' },
  show: { type: Boolean, default: false }
})
const emit = defineEmits(['update:show'])
</script> 