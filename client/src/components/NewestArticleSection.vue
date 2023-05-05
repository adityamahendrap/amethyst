<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const datas = ref()

  const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

  const getNewestArticle = async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/articles/newest/3`)
    const { datas: datasApi } = result.data.payload;
    datas.value = datasApi
  }

  onMounted(() => {
    getNewestArticle()
  })
</script>

<template>
  <section class="container">
    <h1>Newest Articles</h1>
    <div class="wrapper">
      <template v-for="data in datas" :key="data.id">
        <div class="card">
          <div class="image" @click="router.push(`/article/${data.tag}/${data.id}/${data.slug}`)">
            <img width="320" :src="data.image" alt="">
          </div>
          <div class="text">
            <div>
            <span class="me-3 tag-in-card" @click="router.push(`/articles/${data.tag}`)">#{{ data.tag.toUpperCase() }}</span>
            <span class="date">{{ convertTime(data.createdAt) }}</span>
          </div>
          <h3 @click="router.push(`/article/${data.id}`)">{{ data.title }}</h3>
          <p class="desc">{{ data.description }}</p>
        </div>
      </div>
     </template>
    </div>
    <button @click="router.push('/articles/all')">More</button>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

h1 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
  margin-top: 10rem;
}

.card {
  background-color: transparent;
  text-align: start;
  width: 20rem;
}

.card > * {
  color: white;
}

.card .image {
  background-color: blueviolet;
  border-radius: 1rem;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.card .image:hover {
  opacity: 0.5;
  cursor: pointer;
}

.card .text {
  padding: 2rem;
}

h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.7rem;
}

h3:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tag-in-card {
  background-color: #7D41E1;
  color: white;
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.tag-in-card:hover {
  opacity: 0.8;
  cursor: pointer;
}

.date {
  margin-bottom: 1.5rem;
}

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