<template>
  <select
    :class="classes"
    :value="modelValue"
    :disabled="disabled"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="" v-if="placeholder">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'md' }
})
const classes = [
  'fc-select',
  `fc-select-${props.size}`
]
</script> 