<script>
  export let username;
  export let displayname;
  export let profileSrc;

  import { slide } from 'svelte/transition';
</script>

<style>
  section {
    height: 100%;
    position: relative;
    display: grid;
    grid: 1fr / 1fr;
  }

  section > :global(*) {
    grid-area: 1 / 1;
  }

  .heading {
    display: flex;
    align-items: start;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(16, 16, 16, 0.4);
    color: white;
    padding: 1rem;

    width: 100%;
    z-index: 1; /* prevent opacity bug when transitioning images */
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

<section transition:slide>
  <div class="heading">
    <img src={profileSrc} alt={displayname} />
    <div class="inner">
      <h2>{displayname}</h2>
      <p>@{username}</p>
    </div>
  </div>

  <slot></slot>
</section>