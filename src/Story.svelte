<script>
  export let src;
  export let stackOrder = 0;

  import { fade } from 'svelte/transition';
</script>

<style>
  article {
    background-image: var(--src), linear-gradient(to top, rgb(249, 249, 249), rgb(226, 226, 226));
    background-size: cover;
    height: 100%;
    border-radius: 3ch;
    z-index: var(--stack-order);
  }
</style>

<article transition:fade={{duration: 300 }} style="--src: url({src}); --stack-order: {stackOrder};"></article>