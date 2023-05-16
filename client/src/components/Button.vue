<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const props = defineProps(['text', 'route'])
</script>

<template>
  <button @click="route ? router.push(route) : ''">{{ text }}</button>
</template>

<style scoped>
button {
  width: max-content;
  margin: auto;
  padding: 0.8rem 5rem;
  color: white;
  background-color: #7d41e1;
  border-radius: 0.3rem;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>