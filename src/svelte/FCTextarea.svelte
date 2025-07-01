<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let value: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let rows: number = 3;
  export let cols: number = 50;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-textarea',
    `fc-textarea-${size}`
  ].join(' ');
  
  function onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    dispatch('valueChange', value);
  }
</script>

<textarea 
  class={classes}
  {placeholder}
  {value}
  {disabled}
  {readonly}
  {rows}
  {cols}
  on:input={onInput}
/> 