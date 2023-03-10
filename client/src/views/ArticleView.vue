<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import ContactSection from "../components/ContactSection.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();
const data = ref();
const paragraphs = ref();

const getArticle = async () => {
  const result = await axios.get(
    `http://localhost:5000/articles/${route.params.id}`
  );
  if (result.status == 200) {
    data.value = result.data.payload.datas;
    paragraphs.value = result.data.payload.datas[0].paragraph;
    console.log(paragraphs.value);
  }
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

onMounted(() => {
  getArticle();
});
</script>

<template>
  <main v-for="e in data" :key="e.id">
    <h5 class="dir"><router-link class="link" to="/articles/all">Article</router-link> / {{ e.title.toUpperCase() }}</h5>
    <div class="date">{{ convertTime(e.createdAt) }}</div>
    <h1>{{ e.title }}</h1>
    <div class="tag-list">
      <h6 class="tag">#{{e.tag.toUpperCase()}}</h6>
    </div>
    <div class="author">Aditya Mahendra</div>
    <div class="hero"></div>
    <section>
      <h2>{{ e.description }}</h2>
      <br />
      <!-- {{ paragraphs }} -->
      <p>{{ paragraphs }}</p>
      <!-- <hr class="second-line" /> -->
    </section>
  </main>
  <!-- <ContactSection /> -->
  <Footer />
</template>

<style scoped>
section {
  max-width: 50rem;
  margin: auto;
  margin-bottom: 6rem;
}

.dir {
  margin: 3rem;
}

.link {
  color: #a56dfa;
  font-weight: bold;
  text-decoration: none;
}

.link:hover {
  color: #772ce8;
}

.date {
  font-size: 16px;
  margin-top: 3rem;
  text-align: center;
}

h1 {
  font-size: clamp(50px, 15.4929577465px + 6.9014084507vw, 148px);
  text-transform: uppercase;
  text-align: center;
  padding: 0 3rem;
  line-height: 0.9;
  margin: 1rem 0;
}

.tag-list {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.tag {
  text-align: center;
  background-color: black;
  color: white;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0.4rem;
  width: max-content;
}

.author {
  margin: auto;
  width: max-content;
  font-size: 22px;
  text-align: center;
  border-bottom: 3px solid rgb(0, 0, 0, 0.2);
}

.author:hover {
  cursor: pointer;
  border-bottom: 3px solid #a56dfa;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 7rem;
  background: #000000c1;
  max-width: 60rem;
  text-align: center;
  aspect-ratio: 16/7;
  border-radius: 1rem;
}

h2 {
  font-size: clamp(24px, 14.8450704225px + 1.8309859155vw, 50px);
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-size: clamp(16px, 13.1830985915px + 0.5633802817vw, 24px);
}

.second-line {
  margin-top: 3rem;
}

@media (max-width: 860px) {
  section {
    margin: 0 1rem;
    margin-bottom: 6rem;
  }
  h1 {
    padding: 0 1rem;
  }
}

@media (max-width: 957px) {
  .hero {
    border-radius: 0;
  } 
}
</style>
