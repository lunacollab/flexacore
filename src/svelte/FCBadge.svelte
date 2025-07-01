<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let pill: boolean = false;
  
  const classes = [
    'fc-badge',
    `fc-badge-${variant}`,
    `fc-badge-${size}`,
    pill ? 'fc-badge-pill' : ''
  ].join(' ');
</script>

<span class={classes}>
  <slot />
</span> 