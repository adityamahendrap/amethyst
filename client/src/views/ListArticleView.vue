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
const sortStatus = ref('1');
const searchResultLength = ref([])

const checkTitle = (t) => {
  const title = t.toLowerCase();
  return title.includes(search.value.toLowerCase());
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

// const getAllData = async () => {
//   const endpoint = `http://localhost:3000/articles`;
//   const result = await axios.get(endpoint);
//   if (result.status == 200) {
//     datas.value = result.data;

//     getAndFilterTag(result.data)
//   }
// };

const getAllData = async () => {
  const result = await axios.get(`http://localhost:5000/articles`);
  if (result.status == 200) {
    datas.value = result.data.payload.datas;
    sortDataByNameAZ()

    getAndFilterTag(result.data.payload.datas)
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
    return a.createdAt - b.createdAt;
  });
}

const sortDataByDateOldToNew = () => {
  datas.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
}

onMounted(() => {
  getAllData();
});
</script>

<template>
  <Navbar />
  <!-- {{ sortStatus }} -->
  <section>
    <input class="search" type="text" placeholder="Search article" v-model="search"/>
    <div class="sort">
      <button :class="sortStatus == 1 ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 1, sortDataByNameAZ()">A to Z</button>
      <button :class="sortStatus == 2 ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 2, sortDataByNameZA()">Z to A</button>
      <button :class="sortStatus == 3 ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 3, sortDataByDateNewToOld()">Newest to Oldest</button>
      <button :class="sortStatus == 4 ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 4, sortDataByDateOldToNew()">Oldest to Newest</button>
    </div>
    <div>
      <router-link active-class="tagActive" class="tag" to="/articles/all">All</router-link>
      <router-link
        active-class="tagActive"
        class="tag"
        v-for="(tag, index) in allTag"
        :key="index"
        :to="`/articles/${tag}`"
        >#{{ tag.toUpperCase() }}</router-link
      >
    </div>

    <h1>{{ search == '' ? 'Some Article' : `Article with "${search}"`  }}</h1>

    <div class="container" v-if="route.params.tag == 'all'">
      <template v-for="data in datas" :key="data.id">
        <div class="card" v-if="checkTitle(data.title)">
          <span>#{{ data.tag.toUpperCase() }}</span>
          <h3>{{ data.title.toUpperCase() }}</h3>
          <p class="date">{{ convertTime(data.createdAt) }}</p>
          <p class="desc">{{ data.description }}</p>
          <router-link class="btn" :to="`/article/${data.id}`"
            >Read Article</router-link
          >
        </div>
      </template>
    </div>

    <!-- <h1>Not Found</h1> -->
    <!--  -->
    <div class="container" v-if="route.params.tag != 'all'">
      <template v-for="data in datas" :key="data.id">
        <div class="card" v-if="data.tag == `${route.params.tag}` && checkTitle(data.title)">
          <span>#{{ data.tag.toUpperCase() }}</span>
          <h3>{{ data.title.toUpperCase() }}</h3>
          <p class="date">{{ convertTime(data.createdAt) }}</p>
          <p class="desc">{{ data.description }}</p>
          <router-link class="btn" :to="`/article/${data.id}`">Read Article</router-link>
        </div>
      </template>
      </div>
  </section>
  <!-- <Footer /> -->
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}
.sort {
  display: flex;
  margin: 1rem;
  margin-top: 3rem;
}

.sort .tag {
  
}


input {
  all: unset;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  background-color: white;
  border: 2px solid black;
  color: black;
  width: 25rem;
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
  margin: auto;
  margin-bottom: 4rem;
}

.card {
  background-color: #1f1f23;
  text-align: start;
  width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.card > * {
  color: white;
}

.card span {
  background-color: #efeff1;
  color: #1f1f23;
  width: max-content;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
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
  color: #a56dfa;
}
</style>
