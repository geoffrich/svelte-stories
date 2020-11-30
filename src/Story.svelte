<script>
  export let image;
  export let stackOrder = 0;
  const { src, alt, text } = image;

  import { fade } from 'svelte/transition';
</script>

<style>
  article {
    background-image: var(--src), linear-gradient(to top, rgb(249, 249, 249), rgb(226, 226, 226));
    background-size: cover;
    height: 100%;
    border-radius: var(--story-border-radius);
    z-index: var(--stack-order);
    display: grid;
    place-items: center;
  }

  .text {
    background: rgba(16, 16, 16, 0.4);
    color: white;
    font-size: 3rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    transform: translate(-20px, -20px) rotate(-18deg);
  }
</style>

<article transition:fade={{duration: 300 }} style="--src: url({src}); --stack-order: {stackOrder};">
  <p class="visually-hidden">Image alt: {alt}</p>
  {#if text}
  <p class="text">{text}</p>
  {/if}
</article>