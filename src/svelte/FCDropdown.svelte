<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let label: string = 'Dropdown';
  export let open: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  function toggle() {
    open = !open;
    dispatch('openChange', open);
  }
  
  const classes = [
    'fc-dropdown',
    open ? 'fc-dropdown-open' : ''
  ].join(' ');
</script>

<div class={classes}>
  <button 
    class="fc-dropdown-toggle fc-btn"
    on:click={toggle}
    type="button"
    aria-expanded={open}
  >
    {label}
    <span class="fc-dropdown-arrow"></span>
  </button>
  <div class="fc-dropdown-menu {open ? 'fc-dropdown-menu-show' : ''}">
    <slot />
  </div>
</div> 