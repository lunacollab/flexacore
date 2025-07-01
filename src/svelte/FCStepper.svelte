<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let currentStep: number = 0;
  export let steps: Array<{title: string, description?: string}> = [];
  export let showNavigation: boolean = true;
  
  const dispatch = createEventDispatcher();
  
  function next() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      dispatch('currentStepChange', currentStep);
    }
  }
  
  function previous() {
    if (currentStep > 0) {
      currentStep--;
      dispatch('currentStepChange', currentStep);
    }
  }
</script>

<div class="fc-stepper">
  <div class="fc-stepper-header">
    {#each steps as step, i}
      <div class="fc-step {currentStep === i ? 'fc-step-active' : ''} {i < currentStep ? 'fc-step-completed' : ''}">
        <div class="fc-step-icon">
          {#if i < currentStep}
            <span>✓</span>
          {:else}
            <span>{i + 1}</span>
          {/if}
        </div>
        <div class="fc-step-content">
          <div class="fc-step-title">{step.title}</div>
          {#if step.description}
            <div class="fc-step-description">{step.description}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div class="fc-stepper-content">
    <slot />
  </div>
  {#if showNavigation}
    <div class="fc-stepper-footer">
      <button class="fc-btn fc-btn-secondary" on:click={previous} disabled={currentStep === 0}>
        Trước
      </button>
      <button class="fc-btn fc-btn-primary" on:click={next} disabled={currentStep === steps.length - 1}>
        Tiếp
      </button>
    </div>
  {/if}
</div> 