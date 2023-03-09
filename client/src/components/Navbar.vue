<script setup>
</script>

<template>
  <nav>
    <ul>
      <li class="logo">AMETHYST</li>
    </ul>
    <div class="list">
      <router-link active-class="active" class="link" to="/">Home</router-link> 
      <router-link active-class="active" class="link" to="/articles/all">Article</router-link> 
      <!-- <li>API</li> -->
    </div>
    <ul>
      <a href="https://github.com/adityamahendrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <svg class="search" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>
      <!-- <h3 class="hide">X</h3> -->
    </ul>
  </nav>
</template>

<style scoped>
  .hide{
    display: none;
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 3rem;
  }

  .logo {
    font-size: 20px;
    font-weight: 700;
    color: #772ce8;
  }

  ul {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding-left: 0;
  }

  li {
    font-size: 14px;
    font-weight: 400;
    padding: 5px;
    border-bottom: 3px solid transparent;
  }

  li:hover {
    cursor: pointer;
  }

  .list {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .list .link {
    padding: 0.5rem 0;
    color: black;
    text-decoration: none;
  }

  .list .link:hover, .active {
    border-bottom: 3px solid black;
  }

  ul:last-child {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem
  }

  ul:nth-child(2) {
    justify-content: center;
  }

  a {
    display: flex;
  }

  svg {
    cursor: pointer;
  }

  .search {
    scale: 90%;
  }

  @media (max-width: 860px) {
    nav {
      padding: 0 1rem;
    }
    ul:last-child {
      gap: 1rem
    }
    .list li{
      margin: 0 0.5rem;
    }
  }
/*
  @media (max-width: 608px) {
    nav {
      grid-template-columns: 1fr 1fr;
    }
    .list {
      display: none;
    }
    .hide {
      display: block;
    }
  }
  */
</style>