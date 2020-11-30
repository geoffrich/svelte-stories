<script>
  import Story from './Story.svelte';
  import User from './User.svelte';
  import { users } from './mockData';
  import swipe from './swipe';

  let currentUserIndex = 0;
  let offset = 0;
  let swiping = false;
  let currentImageIndex = getFirstImageIndexForCurrentUser();
  $: currentUser = users[currentUserIndex];

  const SWIPE_THRESHOLD = 150;

  function handleClick(e) {
    if (swiping) return;
    const median = stories.offsetLeft + stories.clientWidth / 2;
    const forward = e.clientX > median;
    if (e.ctrlKey) {
      forward ? nextUser() : previousUser(true);
    } else {
      setImageVisibility(forward);
    }
  }

  let swipeTimeout;
  function handleSwipe(e) {
    const { complete, direction, dx } = e.detail;
    swiping = true;
    clearTimeout(swipeTimeout);
    // prevent clicks from triggering on a swipe
    swipeTimeout = setTimeout(() => swiping = false, 100);
    if (complete) {
      if (Math.abs(dx) < SWIPE_THRESHOLD) {
        offset = 0;
        return;
      }
      switch (direction) {
        case 'right':
          previousUser(true);
          break;
        case 'left':
          nextUser();
          break;
      }

    } else {
      offset = direction === 'left' && dx / 3;
    }
  }

  function setImageVisibility(forward) {
    if (forward) {
      if (currentImageIndex < getLastImageIndexForCurrentUser()) {
        currentImageIndex++;
      } else {
        nextUser();
      }
    } else {
      if (currentUser && currentImageIndex > getFirstImageIndexForCurrentUser()) {
        currentImageIndex--;
      } else {
        previousUser();
      }
    }
  }

  function handleKeydown({ key, ctrlKey }) {
    switch (key) {
      case 'ArrowLeft':
        ctrlKey ? previousUser(true) : setImageVisibility(false);
        break;
      case 'ArrowRight':
        ctrlKey ? nextUser() : setImageVisibility(true);
        break;
    }
  }

  function nextUser() {
    offset = 0;
    if (currentUserIndex < users.length) {
      currentUserIndex++;
      currentImageIndex = users[currentUserIndex] && getFirstImageIndexForCurrentUser();
    }
  }

  function previousUser(goToFirstImage = false) {
    offset = 0;
    if (currentUserIndex > 0) {
      currentUserIndex--;
      currentImageIndex = goToFirstImage ? getFirstImageIndexForCurrentUser() : getLastImageIndexForCurrentUser();
    }
  }

  function getFirstImageIndexForCurrentUser() {
    return 0;
  }

  function getLastImageIndexForCurrentUser() {
    return users[currentUserIndex].images.length - 1;
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
    user-select: none;

    background: lightblue;
    border-radius: 3ch;
  }

  :global(.stories.focus-visible:focus) {
    outline: 5px solid red;
  }

  .end {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  #hover, #focus {
    display: none;
    padding: 0.5rem 1rem 1rem 1rem;
  }

  .instructions {
    z-index: var(--stack-order);
    position: absolute;
    background: black;
    color: white;
    bottom: 0;
    width: 100%;
    text-align: center;
    border-radius: 0 0 3ch 3ch;
  }

  :global(.stories:hover:not(.focus-visible)) #hover, :global(.stories.focus-visible:focus #focus) {
    display: block;
  }
</style>

<!-- Add to window instead of container to capture swipes outside the window -->
<svelte:window use:swipe on:swipe={handleSwipe}></svelte:window>

<div
  class="stories"
  bind:this={stories}
  role="region"
  aria-label="stories"
  tabindex="0"
  aria-describedby="focus"
  on:click={handleClick}
  on:keydown={handleKeydown}>
  {#each users as user, userIdx}
    {#if userIdx >= currentUserIndex}
      <User
        {user}
        stackOrder={users.length - userIdx}
        offset={userIdx === currentUserIndex ? offset : 0}>
        {#each user.images as image, idx}
          {#if userIdx !== currentUserIndex || idx >= currentImageIndex}
            <Story {image} stackOrder={user.images.length - idx} />
          {/if}
        {/each}
      </User>
    {/if}
  {/each}
  <p class="end">You've reached the end!</p>
    <div class="instructions" style="--stack-order: {users.length + 1}">
      <p id="hover">Tap on the left and right side to scroll. Holding CTRL or swiping skips to the next user.</p>
      <p id="focus">Use the left and right arrow keys to scroll. Holding CTRL or swiping skips to the next user.</p>
    </div>
</div>
