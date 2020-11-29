<script>
  export let username;
  export let displayname;
  export let profileSrc;
  export let stackOrder;

  import { fly } from 'svelte/transition';
  
  let duration = 500;
</script>

<style>
  section {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: grid;
    grid: auto 1fr / 1fr;
    z-index: var(--stack-order);
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
    z-index: 1;
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
  style="--stack-order: {stackOrder}"
  transition:fly="{{duration: duration, x: -100}}">
  <div class="heading">
    <img src={profileSrc} alt={displayname} />
    <div class="inner">
      <h2>{displayname}</h2>
      <p>@{username}</p>
    </div>
  </div>

  <slot></slot>
</section>