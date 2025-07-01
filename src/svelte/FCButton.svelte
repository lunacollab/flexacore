<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  export let type: string = 'button';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<button class={"fc-btn fc-btn-" + variant} type={type} on:click={(e) => dispatch('click', e)}>
  <slot />
</button> 