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