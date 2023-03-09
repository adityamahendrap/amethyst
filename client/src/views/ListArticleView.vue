<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const datas = ref();
const allTag = ref([]);
const search = ref("");
const sortStatus = ref('time-newestToOldest')

const checkTitle = (t) => {
  const title = t.toLowerCase();
  return title.includes(search.value.toLowerCase());
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

const getAllData = async () => {
  const endpoint = `http://localhost:3000/articles`;
  const result = await axios.get(endpoint);
  if (result.status == 200) {
    datas.value = result.data;

    getAndFilterTag(result.data)
  }
};

const getAndFilterTag = (resultData) => {
  resultData.forEach((data) => {
    allTag.value.push(data.tag);
    allTag.value = allTag.value.filter(
      (value, index, array) => array.indexOf(value) == index
    );
  });
}

const sortDataByNameAZ = () => {
  datas.value.sort((a, b) => {
      let A = a.title.toUpperCase(); // ignore upper and lowercase
      let B = b.title.toUpperCase(); // ignore upper and lowercase
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    console.log(datas.value);
}

const sortDataByNameZA = () => {
  datas.value.sort((a, b) => {
      let A = a.title.toUpperCase(); // ignore upper and lowercase
      let B = b.title.toUpperCase(); // ignore upper and lowercase
      if (A > B) {
        return -1;
      }
      if (A < B) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    console.log(datas.value);
}

const sortDataByDateNewToOld = () => {
  datas.value.sort((a, b) => {
    return a.date.createdAt - b.date.createdAt;
  });
}

const sortDataByDateOldToNew = () => {
  datas.value.sort((a, b) => {
    return b.date.createdAt - a.date.createdAt;
  });
}

onMounted(() => {
  getAllData();
});
</script>

<template>
  <Navbar />
  {{ sortStatus }}
  <section>
    <div class="sort">
      <button @click.prevent="sortStatus = 'title-AZ', sortDataByNameAZ()">sort by title AZ</button>
      <button @click.prevent="sortStatus = 'title-ZA', sortDataByNameZA()">sort by title ZA</button>
      <button @click.prevent="sortStatus = 'date-newToOld', sortDataByDateNewToOld()">sort by date new to old</button>
      <button @click.prevent="sortStatus = 'date-oldToNew', sortDataByDateOldToNew()">sort by date old to new</button>
    </div>
    <input
      class="search"
      type="text"
      placeholder="Search article"
      v-model="search"
    />
    <router-link active-class="tagActive" class="tag" to="/articles/all"
      >All</router-link
    >
    <router-link
      active-class="tagActive"
      class="tag"
      v-for="(tag, index) in allTag"
      :key="index"
      :to="`/articles/${tag}`"
      >#{{ tag }}</router-link
    >

    <h1>Some Article</h1>

    <div class="container" v-if="route.params.tag == 'all'">
      <div v-for="data in datas" :key="data.id">
        <div class="card" v-if="checkTitle(data.title)">
          <h3>{{ data.title }}</h3>
          <p class="date">{{ convertTime(data.date.createdAt) }}</p>
          <span>#{{ data.tag.toUpperCase() }}</span>
          <p class="desc">{{ data.description }}</p>
          <router-link class="btn" :to="`/article/${data.id}`"
            >Read Article</router-link
          >
        </div>
      </div>
    </div>
    <!--  -->
    <div class="container" v-if="route.params.tag != 'all'">
      <div v-for="data in datas" :key="data.id">
        <div
          class="card"
          v-if="data.tag == `${route.params.tag}` && checkTitle(data.title)"
        >
          <h3>{{ data.title }}</h3>
          <p class="date">{{ convertTime(data.date.createdAt) }}</p>
          <span>#{{ data.tag.toUpperCase() }}</span>
          <p class="desc">{{ data.description }}</p>
          <router-link class="btn" :to="`/article/${data.id}`"
            >Read Article</router-link
          >
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped>
.sort {
  display: flex;
  flex-direction: column;
  width: 15rem;
}
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
