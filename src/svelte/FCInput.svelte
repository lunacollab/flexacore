<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let value: string = '';
  export let type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-input',
    `fc-input-${size}`
  ].join(' ');
  
  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('valueChange', value);
  }
</script>

<input 
  class={classes}
  {type}
  {placeholder}
  {value}
  {disabled}
  {readonly}
  on:input={onInput}
/> 