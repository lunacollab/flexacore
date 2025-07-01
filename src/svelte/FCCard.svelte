<script lang="ts">
  export let header: string = '';
  export let footer: string = '';
  export let variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'light';
  export let border: boolean = true;
  export let shadow: boolean = false;
  export let showHeader: boolean = false;
  export let showFooter: boolean = false;
  
  const classes = [
    'fc-card',
    `fc-card-${variant}`,
    border ? 'fc-card-border' : '',
    shadow ? 'fc-card-shadow' : ''
  ].join(' ');
</script>

<div class={classes}>
  {#if header || showHeader}
    <div class="fc-card-header">
      <h5 class="fc-card-title">{header}</h5>
      <slot name="header" />
    </div>
  {/if}
  <div class="fc-card-body">
    <slot />
  </div>
  {#if footer || showFooter}
    <div class="fc-card-footer">
      <slot name="footer" />
      {#if footer}
        <span>{footer}</span>
      {/if}
    </div>
  {/if}
</div> 