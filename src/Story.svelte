<script>
  export let src;


  export let isSeen = false;
</script>

<style>
  article {
    background-image: var(--src);
    height: 100%;
    transition: opacity 0.3s;
  }

  article.seen {
    opacity: 0;
    pointer-events: none;
  }
</style>

<article class:seen={isSeen} style="--src: url({src});"></article>