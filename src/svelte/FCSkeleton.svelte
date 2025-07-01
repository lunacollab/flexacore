<script lang="ts">
  export let variant: 'text' | 'circular' | 'rectangular' = 'text';
  export let width: string = '100%';
  export let height: string = '1rem';
  export let animated: boolean = true;
  
  const classes = [
    'fc-skeleton',
    `fc-skeleton-${variant}`,
    animated ? 'fc-skeleton-animated' : ''
  ].join(' ');
</script>

<div class={classes} style="width: {width}; height: {height}"></div> 