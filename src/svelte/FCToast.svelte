<script lang="ts">
  export let variant: 'success' | 'danger' | 'warning' | 'info' = 'info';
  export let title: string = '';
  export let autoClose: boolean = true;
  export let delay: number = 5000;

  const classes = [
    'fc-toast',
    `fc-toast-${variant}`
  ].join(' ');
</script>

<div class={classes} role="alert" aria-live="assertive" aria-atomic="true">
  <div class="fc-toast-header">
    <strong class="fc-toast-title">{title}</strong>
    <button type="button" class="fc-toast-close" on:click={() => dispatch('close')} aria-label="Đóng">×</button>
  </div>
  <div class="fc-toast-body">
    <slot />
  </div>
</div> 