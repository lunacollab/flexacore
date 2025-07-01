<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let value: string | number = '';
  export let options: Array<{value: string | number, label: string, disabled?: boolean}> = [];
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-select',
    `fc-select-${size}`
  ].join(' ');
  
  function onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    dispatch('valueChange', value);
  }
</script>

<select 
  class={classes}
  {value}
  {disabled}
  on:change={onChange}
>
  {#if placeholder}
    <option value="">{placeholder}</option>
  {/if}
  {#each options as option}
    <option value={option.value} disabled={option.disabled}>
      {option.label}
    </option>
  {/each}
</select> 