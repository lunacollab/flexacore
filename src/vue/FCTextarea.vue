<template>
  <textarea
    :class="classes"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :cols="cols"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  cols: { type: Number, default: 50 },
  size: { type: String, default: 'md' }
})
const classes = [
  'fc-textarea',
  `fc-textarea-${props.size}`
]
</script> 