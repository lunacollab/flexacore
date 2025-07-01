<template>
  <label :class="['fc-switch', disabled ? 'fc-switch-disabled' : '']">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="onChange"
      :disabled="disabled"
    />
    <span class="fc-switch-slider"></span>
    <span class="fc-switch-label" v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script> 