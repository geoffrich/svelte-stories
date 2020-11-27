<script>
  import Story from './Story.svelte';
  import User from './User.svelte';

  const images = [...Array(5)].map((val, idx) => ({
      src: `https://picsum.photos/480/840?random=${idx}`,
      isSeen: false
    })
  );

  function handleClick(e, idx) {
    const median = stories.offsetLeft + (stories.clientWidth / 2);

    if (e.clientX > median) {
      images[idx].isSeen = idx !== 0 && true;
    } else if (idx < images.length - 1) {
      images[idx + 1].isSeen = false; // TODO: images in reverse order
    } else {
      console.log(idx);
    }
  }

  let stories;
</script>

<style>
  .stories {
    max-width: 480px;
    max-height: 848px;

    width: 100vw;
    height: 100vh;
  }
</style>

<div class="stories" bind:this={stories}>
  <User username="geoffrich_" displayname="Geoff" profileSrc="/images/profile1.jpg">
    {#each images as image, idx }
      <Story src={image.src} isSeen={image.isSeen} on:click={(e) => handleClick(e, idx)}/>
    {/each}
  </User>
</div>