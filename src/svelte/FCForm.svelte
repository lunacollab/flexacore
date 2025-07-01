<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';
  export let novalidate: boolean = true;
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-form',
    `fc-form-${layout}`
  ].join(' ');
  
  function onSubmit(event: Event) {
    dispatch('submit', event);
  }
</script>

<form class={classes} on:submit|preventDefault={onSubmit} novalidate={novalidate}>
  <slot />
</form> 