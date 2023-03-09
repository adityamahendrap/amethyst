<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useRoute } from 'vue-router';

const route = useRoute()
const datas = ref()
const allTag = ref([])
const search = ref('')

const checkTitle = (t) => {
  const title = t.toLowerCase()
  return title.includes(search.value.toLowerCase())
}

const getAllData = async () => {
  const endpoint = `http://localhost:3000/articles`;
  const result = await axios.get(endpoint);
  if (result.status == 200) {
    datas.value = result.data
    // console.log(result.data);
    
    result.data.forEach(data => {
      allTag.value.push(data.tag)
      allTag.value = allTag.value.filter((value, index, array) => array.indexOf(value) == index);
    });
    // console.log(allTag.value);
  }
};

onMounted(() => {
  getAllData()
}) 
</script>

<template>
  <Navbar />
  <section>
    <input class="search" type="text" placeholder="Search article" v-model="search">
    <router-link active-class="tagActive" class="tag" to="/articles/all">All</router-link>
    <router-link active-class="tagActive" class="tag" v-for="(tag, index) in allTag" :key="index" :to="`/articles/${tag}`">#{{ tag }}</router-link>

    <h1>Some Article</h1>

    <div class="container" v-if="route.params.tag == 'all'">
      <div v-for="data in datas" :key="data.id">
        <div class="card" v-if="checkTitle(data.title)">
          <h3>{{data.title}}</h3>
          <p class="date">{{data.date.createdAt}}</p>
          <span>#{{data.tag.toUpperCase()}}</span>
          <p class="desc">{{data.description}}</p>
          <router-link class="btn" :to="`/article/${data.id}`">Read Article</router-link>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="container" v-if="route.params.tag != 'all'">
      <div v-for="data in datas" :key="data.id">
        <div class="card" v-if="data.tag == `${route.params.tag}` && checkTitle(data.title)">
          <h3>{{data.title}}</h3>
          <p class="date">{{data.date.createdAt}}</p>
          <span>#{{data.tag.toUpperCase()}}</span>
          <p class="desc">{{data.description}}</p>
          <router-link class="btn" :to="`/article/${data.id}`">Read Article</router-link>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<style scoped>

.search {
  margin: 1rem;
  padding: 0.3rem 1rem;
}

.tag {
  all: unset;
  background-color: white;
  color: black;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  border: 1px solid black;
  cursor: pointer;
  margin: 0.4rem;
}

.tagActive {
  color: white;
  background-color: black;
}


h1 {
  margin: 3rem;
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.card {
  background-color: #222222;
  text-align: start;
  width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.card > * {
  color: white;
}

.date {
  margin-bottom: 1.5rem;
}

.desc {
  margin-bottom: 1rem;
}

.btn {
  width: max-content;
  margin: auto;
  margin-top: 2rem;
  border: none;
  cursor: pointer;
  border-radius: 0.3rem;
  color: rgb(193, 131, 250);
}

 .btn:hover {
  opacity: 0.9;
}
</style>
