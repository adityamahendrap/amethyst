<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import ContactSection from "../components/ContactSection.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();
const router = useRouter();
const data = ref();
const paragraphs = ref();

const getArticle = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/articles/${route.params.id}`
  );
  if (result.status == 200) {
    const _data = result.data.payload.datas;
    const { paragraph } = _data[0];
    data.value = _data;
    paragraphs.value = paragraph;
  }
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

onMounted(() => {
  getArticle();
});
</script>

<template>
  <main v-for="e in data" :key="e.id">
    <h5 class="dir">
      <router-link class="link" to="/articles/all">Article</router-link> / 
      <router-link class="link" :to="`/articles/${data[0].tag}`">{{ data[0].tag.toUpperCase() }}</router-link> /
      {{ e.title }}
    </h5>
    <div class="date">{{ convertTime(e.createdAt) }}</div>
    <h1>{{ e.title }}</h1>
    <div class="tag-list">
      <h6 class="tag" @click="router.push(`/articles/${e.tag}`)">#{{ e.tag.toUpperCase() }}</h6>
    </div>
    <div class="author">Aditya Mahendra</div>
    <kinesis-container>
      <kinesis-element :strength="20">
        <div class="hero">
          <img :src="e.image" alt="">
        </div>
      </kinesis-element>
    </kinesis-container>
    <section>
      <h2 class="desc">{{ e.description }}</h2>
      <br />
      
      <p v-html="paragraphs"></p>
    </section>
  </main>
  <!-- <ContactSection /> -->
  <Footer />
</template>

<style scoped>

* {
  color: white;
}

main {
  background: #1F1F23;
}

section {
  max-width: 50rem;
  margin: auto;
  padding-bottom: 6rem;
}

.dir {
  padding: 2rem;
  color: white;
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
  text-align: center;
  padding-top: 1rem;
}

h1 {
  font-size: clamp(50px, 15.4929577465px + 6.9014084507vw, 148px);
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
  all: unset;
  color: white;
  background-color: #7D41E1;
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

.author {
  margin: auto;
  width: max-content;
  font-size: 22px;
  text-align: center;
  border-bottom: 3px solid rgb(138, 138, 138)
}

.author:hover {
  cursor: pointer;
  border-bottom: 3px solid #7D41E1;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 7rem;
  background: #7D41E1;
  max-width: 60rem;
  text-align: center;
  aspect-ratio: 16/7;
  border-radius: 1rem;
  overflow: hidden;
}

.hero image {
  padding: 4rem;
}

h2 {
  font-size: clamp(24px, 14.8450704225px + 1.8309859155vw, 50px);
  color: #a56dfa;
  border-left: 5px solid #7D41E1;
  padding-bottom: 0.8rem;
  padding-left: 1rem;
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
    padding-bottom: 3rem;
  }
  h1 {
    padding: 0 1rem;
  }
  .hero {
    margin-bottom: 4rem;
  }
}

@media (max-width: 957px) {
  .hero {
    border-radius: 0;
  }
}
</style>
