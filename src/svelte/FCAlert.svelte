<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'info';
  export let dismissible: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-alert',
    `fc-alert-${variant}`,
    dismissible ? 'fc-alert-dismissible' : ''
  ].join(' ');
</script>

<div class={classes} role="alert">
  <div class="fc-alert-content">
    <slot />
  </div>
  {#if dismissible}
    <button 
      type="button" 
      class="fc-alert-close" 
      on:click={() => dispatch('dismiss')}
      aria-label="Đóng"
    >
      ×
    </button>
  {/if}
</div> 