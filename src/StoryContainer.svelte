<script>
  import Story from './Story.svelte';
  import User from './User.svelte';
  import { users } from './mockData';

  let currentUserIndex = 0;
  let imageIndex = users[currentUserIndex].images.length - 1;
  $: currentUser = users[currentUserIndex];

  function handleClick(e) {
    const median = stories.offsetLeft + (stories.clientWidth / 2);
    setImageVisibility(e.clientX > median);
  }

  function setImageVisibility(forward) {
    if (forward) {
      if (imageIndex > 0) {
        imageIndex--;
      } else {
        nextUser();
      }
    } else {
      if (imageIndex < currentUser.images.length - 1) {
        imageIndex++;
      } else {
        previousUser();
      }
    }
  }

  function handleKeydown({ key }) {
    switch (key) {
      case "ArrowLeft":
        setImageVisibility(false);
        break;
      case "ArrowRight":
        setImageVisibility(true);
        break;
    }
  }

  function nextUser() {
    if (currentUserIndex + 1 < users.length) {
      currentUserIndex++;
      imageIndex = users[currentUserIndex].images.length - 1;
    }
  }

  function previousUser() {
    if (currentUserIndex > 0) {
      currentUserIndex--;
      imageIndex = 0;
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
    margin: 0 auto;

    position: relative;
  }
  
  :global(.stories.focus-visible:focus) {
    outline: 5px solid red;
  }
</style>

<div class="stories" bind:this={stories} role="region" aria-label="stories" tabindex="0" on:click={handleClick} on:keydown={handleKeydown}>
  {#each users as user, userIdx}
  {#if userIdx >= currentUserIndex}
    <User 
      username={user.username} 
      displayname={user.displayname} 
      profileSrc={user.profileSrc} 
      stackOrder={users.length - userIdx}>
      {#each user.images as image, idx }
        <Story src={image.src} isSeen={idx > imageIndex} />
      {/each}
    </User>
  {/if}
  {/each}
</div>