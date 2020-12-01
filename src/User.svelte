<script>
  export let user;
  export let stackOrder;
  export let offset;

  const { username, displayname, profileSrc } = user;
  import { fly } from 'svelte/transition';
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    position: absolute;
    display: grid;
    grid: auto 1fr / 1fr;
    z-index: var(--stack-order);
    transform: translate(calc(var(--offset) * 1px));
  }

  section.returning {
    transition: transform 0.2s ease-out;
  }

  section > :global(*) {
    grid-row: 1 / span 2;
    grid-column: 1;
  }

  .heading {
    display: flex;
    align-items: start;
    background: rgba(16, 16, 16, 0.4);
    color: white;
    padding: 1rem;

    width: 100%;
    z-index: var(--stack-order);
    grid-row: 1;
    margin-top: 2rem;
  }

  .inner {
    display: flex;
    flex-direction: column;
  }

  .inner > * {
    margin: 0;
  }

  img {
    border-radius: 50%;
    width: 100%;
    max-width: 50px;
    margin-right: 10px;
  }
</style>

<section 
  style="--stack-order: {stackOrder}; --offset: {offset};"
  transition:fly="{{duration: 500, x: -100}}"
  class:returning={offset === 0}>
  <div class="heading" style="--stack-order: {user.images.length + 1}">
    <img src={profileSrc} alt={displayname} />
    <div class="inner">
      <h2>{displayname}</h2>
      <p>@{username}</p>
    </div>
  </div>

  <slot></slot>
</section>