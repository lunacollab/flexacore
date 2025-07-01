<template>
  <div class="fc-stepper">
    <div class="fc-stepper-header">
      <slot name="header" />
    </div>
    <div class="fc-stepper-content">
      <slot />
    </div>
    <div class="fc-stepper-footer" v-if="showNavigation">
      <button class="fc-btn fc-btn-secondary" @click="previous" :disabled="currentStep === 0">Trước</button>
      <button class="fc-btn fc-btn-primary" @click="next" :disabled="currentStep === steps - 1">Tiếp</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  currentStep: { type: Number, default: 0 },
  steps: { type: Number, default: 1 },
  showNavigation: { type: Boolean, default: true }
})
const emit = defineEmits(['update:currentStep'])
const current = ref(props.currentStep)
watch(() => props.currentStep, v => current.value = v)
function next() {
  if (current.value < props.steps - 1) emit('update:currentStep', current.value + 1)
}
function previous() {
  if (current.value > 0) emit('update:currentStep', current.value - 1)
}
</script> 