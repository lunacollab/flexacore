<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let activeIndex: number = 0;
  export let tabs: Array<{title: string, disabled?: boolean}> = [];
  
  const dispatch = createEventDispatcher();
  
  function selectTab(index: number) {
    if (index >= 0 && index < tabs.length && !tabs[index].disabled) {
      activeIndex = index;
      dispatch('activeIndexChange', index);
    }
  }
</script>

<div class="fc-tabs">
  <div class="fc-tabs-nav">
    {#each tabs as tab, i}
      <button 
        class="fc-tabs-tab {activeIndex === i ? 'fc-tabs-tab-active' : ''} {tab.disabled ? 'fc-tabs-tab-disabled' : ''}"
        on:click={() => selectTab(i)}
        disabled={tab.disabled}
      >
        {tab.title}
      </button>
    {/each}
  </div>
  <div class="fc-tabs-content">
    <slot />
  </div>
</div> 