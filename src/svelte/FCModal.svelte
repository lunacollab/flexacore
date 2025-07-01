<script lang="ts">
  export let open: boolean = false;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function onBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) dispatch('close');
  }
</script>

<div class={"fc-modal" + (open ? ' fc-modal-active' : '')} tabindex="-1" role="dialog" aria-modal="true" on:click={onBackdrop}>
  <div class="fc-modal-content">
    <slot />
    <button class="fc-modal-close" on:click={() => dispatch('close')} type="button" aria-label="Đóng">×</button>
  </div>
</div> 