<script>
  import Story from './Story.svelte';
  import User from './User.svelte';

  const defaultImages = [...Array(2)].map((_, idx) => ({
      src: `https://picsum.photos/480/840?random=${idx}`,
      isSeen: false
    })
  );

  const users = [
    {
      username: "geoffrich_",
      displayname: "Geoff",
      profileSrc: "/images/profile1.jpg",
      images: defaultImages
    },
    {
      username: "argyleink",
      displayname: "Adam Argyle",
      profileSrc: "/images/profile2.jpg",
      images: defaultImages
    }
  ]

  let userIndex = 0;
  let imageIndex = users[userIndex].images.length - 1;
  $: currentUser = users[userIndex];

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
      if (imageIndex < defaultImages.length - 1) {
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
    if (userIndex + 1 < users.length) {
      userIndex++;
      imageIndex = currentUser.images.length - 1;
    }
  }

  function previousUser() {
    if (userIndex > 0) {
      userIndex--;
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
  }
  
  .stories:focus {
    outline: 5px solid red;
  }
</style>

<div class="stories" bind:this={stories} role="region" aria-label="stories" tabindex="0" on:click={handleClick} on:keydown={handleKeydown}>
  {#key currentUser.username}
  <User username={currentUser.username} displayname={currentUser.displayname} profileSrc={currentUser.profileSrc}>
    {#each currentUser.images as image, idx }
      <Story src={image.src} isSeen={idx > imageIndex} />
    {/each}
  </User>
  {/key}
</div>