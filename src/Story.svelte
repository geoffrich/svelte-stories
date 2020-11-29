<script>
  export let src;


  export let isSeen = false;
</script>

<style>
  article {
    background-image: var(--src), linear-gradient(to top, rgb(249, 249, 249), rgb(226, 226, 226));
    background-size: cover;
    height: 100%;
    transition: opacity 0.3s;
    border-radius: 3ch;
  }

  article.seen {
    opacity: 0;
    pointer-events: none;
  }
</style>

<article class:seen={isSeen} style="--src: url({src});"></article>