<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <nav>
    <div class="container">
      <kinesis-container>
        <kinesis-element :strength="7" transformOrigin="50% 300%" type="depth">
          <div @click="router.push({name: 'home'})" class="logo">AMETHYST</div>
        </kinesis-element>
      </kinesis-container>

      <div class="nav-list">
        <router-link active-class="active" class="link" to="/"
          >Home</router-link
        >
        <router-link
          :class="route.fullPath != '/' ? 'active' : ''"
          active-class="active"
          class="link"
          to="/articles/all"
          >Article</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: #1f1f23;
}
.container {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  align-items: center;
}

.nav-list {
  display: flex;
  gap: 2rem;
  font-weight: bold;
}

.link {
  color: #676767;
  text-decoration: none;
}
.link:hover {
  opacity: 0.8;
}

.logo {
  font-family: "Krona One", sans-serif;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.active {
  color: #7d41e1;
}
</style>

<!-- 
  .hide{
    display: none;
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 3rem;
    background-color: #18181b;
    border-bottom: 10px solid #772ce8;;
  }

  .logo {
    font-size: 20px;
    font-weight: 700;
    color: white;

  }

  ul {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
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
    gap: 2rem;
  }

  ul:nth-child(2) {
    justify-content: center;
  }

  ul a {
    background-color: #fff;
    border-radius: 100%;
  }

  a {
    display: flex;
  }

  svg {
    cursor: pointer;
    color: white;
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
  } -->
