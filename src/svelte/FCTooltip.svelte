<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let content: string = '';
  export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  export let show: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  const classes = [
    'fc-tooltip',
    show ? 'fc-tooltip-show' : ''
  ].join(' ');
</script>

<div class={classes} role="tooltip" style="display: {show ? 'block' : 'none'}">
  {content}
</div> 