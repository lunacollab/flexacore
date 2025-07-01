<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let label: string = '';
  
  const dispatch = createEventDispatcher();
  
  function onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
    dispatch('checkedChange', checked);
  }
  
  const classes = [
    'fc-switch',
    disabled ? 'fc-switch-disabled' : ''
  ].join(' ');
</script>

<label class={classes}>
  <input 
    type="checkbox" 
    {checked} 
    on:change={onChange}
    {disabled}
  />
  <span class="fc-switch-slider"></span>
  {#if label}
    <span class="fc-switch-label">{label}</span>
  {/if}
</label> 