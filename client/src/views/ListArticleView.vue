<script setup>
import { onMounted, ref, watch, computed } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const datas = ref();
const allTag = ref([]);
const search = ref("");
const sortStatus = ref('AZ');
const countVisible = ref(!0)

watch(search, (input) => {
  datas.value.forEach(data => {
    if(data.title.includes(input.toUpperCase())) {
      data.isVisible = true;
    } else {
      data.isVisible = false
    }
  });

  countVisible.value = datas.value.reduce((acc, data) => data.isVisible ? acc + 1 : acc, 0);
})

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

const getAllData = async () => {
  const result = await axios.get(`http://localhost:5000/articles`);
  const { datas: datasApi } = result.data.payload
  datas.value = datasApi;
  sortDataByNameAZ()

  datas.value = datas.value.map(data => ({...data, isVisible: true}));
  getAndFilterTag(datasApi)
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
      let A = a.title; 
      let B = b.title;
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });
}

const sortDataByNameZA = () => {
  datas.value.sort((a, b) => {
      let A = a.title;
      let B = b.title;
      if (A > B) {
        return -1;
      }
      if (A < B) {
        return 1;
      }
      return 0;
    });
}

const sortDataByDateNewToOld = () => {
  datas.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
}

const sortDataByDateOldToNew = () => {
  datas.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });
}

onMounted(() => {
  getAllData();
});
</script>

<template>
  
  <section>
    <Navbar />
    <div class="container">
      <div class="box animate">
        <div class="hero-text">
          <img src="../assets/line.png">
          <h1>{{ search == '' ? 'Some Article' : `Article with "${search}"` }}</h1>
        </div>
        <input class="search" type="text" placeholder="Search for a thing..." maxlength="10" v-model="search"/>
      </div>

      <div class="sort">
        <button :class="sortStatus == 'AZ' ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 'AZ', sortDataByNameAZ()">A to Z</button>
        <button :class="sortStatus == 'ZA' ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 'ZA', sortDataByNameZA()">Z to A</button>
        <button :class="sortStatus == 'newestOldest' ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 'newestOldest', sortDataByDateNewToOld()">Newest to Oldest</button>
        <button :class="sortStatus == 'oldestNewest' ? 'tagActive' : ''" class="tag" @click.prevent="sortStatus = 'oldestNewest', sortDataByDateOldToNew()">Oldest to Newest</button>
      </div>
      <div class="tag-list">
        <router-link active-class="tagActive" class="tag" to="/articles/all">All</router-link>
        <router-link
        active-class="tagActive"
        class="tag"
        v-for="(tag, index) in allTag"
        :key="index"
        :to="`/articles/${tag}`"
        >#{{ tag }}</router-link>
      </div>

      
      <div class="wrapper" v-if="route.params.tag == 'all'">
        <h1 v-if="countVisible == 0">Article does'nt exist</h1>
        <template v-for="data in datas" :key="data.id">
            <div class="card" v-if="data.isVisible">
              <div class="image" @click="router.push(`/article/${data.id}`)">
                <img width="320" :src="data.image" alt="">
              </div>
              <div class="text">
                <div>
                <span class="me-3 tag-in-card" @click="router.push(`/articles/${data.tag}`)">#{{ data.tag }}</span>
                <span class="date">{{ convertTime(data.createdAt) }}</span>
              </div>
              <h3 @click="router.push(`/article/${data.id}`)">{{ data.title }}</h3>
              <p class="desc">{{ data.description }}</p>
            </div>
          </div>
        </template>
      </div>
      
      <div class="wrapper" v-if="route.params.tag != 'all'">
        <h1 v-if="countVisible == 0">Article does'nt exist</h1>
        <template v-for="data in datas" :key="data.id">
          <div class="card" v-if="data.tag == `${route.params.tag}` && data.isVisible">
            <div class="image" @click="router.push(`/article/${data.id}`)">
              <img width="320" :src="data.image" alt="">
            </div>
            <div class="text">
              <div>
                <span class="me-3 tag-in-card" @click="router.push(`/articles/${data.tag}`)">#{{ data.tag }}</span>
                <span class="date">{{ convertTime(data.createdAt) }}</span>
              </div>
              <h3 @click="router.push(`/article/${data.id}`)">{{ data.title }}</h3>
              <p class="desc">{{ data.description }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<style scoped>
section {
  background-color: #1F1F23;
  min-height: 100vh;
}

h1 {
  color: white;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box {
  background-color: #7D41E1;
  color: white;
  width: 100%;
  text-align: center;
  height: 15rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

input {
  all: unset;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  background-color: white;
  color: black;
  width: 35%;
  position: absolute;
  bottom: 0;
  transform: translate(0, 50%);
  background-color: #3D3D40;
  color: #B4B4B4;
  text-align: left;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border: 3px solid transparent;
}

input:hover {
  border: 3px solid #535356;
}

input:focus {
  border: 3px solid #a56dfa;
  background-color: #1F1F23;
}

.hero-text {
  position: relative;
}

.hero-text h1 {
  font-weight: bold;
}

.hero-text img {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-80%, -50%);
}


.sort {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
}  

.sort button:hover {
  opacity: 0.8;
}

.tag-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 0.5rem;
}

.tag {
  all: unset;
  background-color: transparent;
  color: #9A9A9A;
  width: max-content;
  padding: 0.5rem 2rem;
  border-radius: 5rem;
  cursor: pointer;
  margin: 0.5rem;
  font-weight: bold; 
}

.tag:hover {
  opacity: 0.8;
}

.tagActive {
  color: white;
  background-color: #7D41E1;

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

.animate {
  background: linear-gradient(38deg, #7d41e1, #71579d, #b793f2, #601da5);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}

@-webkit-keyframes AnimationName {
  0%{background-position:94% 0%}
  50%{background-position:7% 100%}
  100%{background-position:94% 0%}
}
@-moz-keyframes AnimationName {
  0%{background-position:94% 0%}
  50%{background-position:7% 100%}
  100%{background-position:94% 0%}
}
@keyframes AnimationName {
  0%{background-position:94% 0%}
  50%{background-position:7% 100%}
  100%{background-position:94% 0%}
} 

@media (max-width:1193px) {
  input {
    width: 20rem;
  }
  
}

@media (max-width:765px) {
  .sort {
    display: none;
  }
  .tag-list {
    margin-top: 5rem;
  } 
}

</style>
