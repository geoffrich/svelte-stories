<script>
  import Story from './Story.svelte';
  import User from './User.svelte';
  import { users } from './mockData';
  import swipe from './swipe';

  let currentUserIndex = 0;
  let offset = 0;
  let swiping = false;
  let imageIndex = users[currentUserIndex].images.length - 1;
  $: currentUser = users[currentUserIndex];

  function handleClick(e) {
    if (swiping) return;
    const median = stories.offsetLeft + stories.clientWidth / 2;
    const forward = e.clientX > median;
    if (e.ctrlKey) {
      forward ? nextUser() : previousUser();
    } else {
      setImageVisibility(forward);
    }
  }

  function handleSwipe(e) {
    const { complete, direction, dx } = e.detail;
    swiping = true;
    if (complete) {
      switch (direction) {
        case 'right':
          previousUser();
          break;
        case 'left':
          nextUser();
          break;
      }
      // prevent clicks from triggering on a swipe
      setTimeout(() => swiping = false, 100);
    } else {
      offset = direction === 'left' && dx;
    }
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

  function handleKeydown({ key, ctrlKey }) {
    switch (key) {
      case 'ArrowLeft':
        ctrlKey ? previousUser() : setImageVisibility(false);
        break;
      case 'ArrowRight':
        ctrlKey ? nextUser() : setImageVisibility(true);
        break;
    }
  }

  function nextUser() {
    offset = 0;
    if (currentUserIndex + 1 < users.length) {
      currentUserIndex++;
      imageIndex = users[currentUserIndex].images.length - 1;
    }
  }

  function previousUser() {
    offset = 0;
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

<div
  class="stories"
  use:swipe
  bind:this={stories}
  role="region"
  aria-label="stories"
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeydown}
  on:swipe={handleSwipe}>
  {#each users as user, userIdx}
    {#if userIdx >= currentUserIndex}
      <User
        username={user.username}
        displayname={user.displayname}
        profileSrc={user.profileSrc}
        stackOrder={users.length - userIdx}
        offset={userIdx === currentUserIndex ? offset : 0}>
        {#each user.images as image, idx}
          <Story src={image.src} isSeen={idx > imageIndex} />
        {/each}
      </User>
    {/if}
  {/each}
</div>
