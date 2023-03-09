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
    `http://localhost:3000/articles?id=${route.params.id}`
  );
  if (result.status == 200) {
    data.value = result.data;
    paragraphs.value = result.data[0].paragraph;
  }
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US");

onMounted(() => {
  getArticle();
});
</script>

<template>
  <main v-for="e in data" :key="e.id">
    <h5 class="dir">AMETHYST / article / {{ e.title }}</h5>
    <div class="date">{{ convertTime(e.date.createdAt) }}</div>
    <h1>{{ e.title }}</h1>
    <h6>{{e.tag}}</h6>
    <div class="author">Aditya Mahendra</div>
    <div class="hero"></div>
    <section>
      <h2>
        {{ e.description }}
      </h2>
      <br />
      <!-- {{ paragraphs }} -->
      <p v-for="paragraph in paragraphs" :key="paragraph.id">
        {{ paragraph.content }}
      </p>
      <hr class="second-line" />
    </section>
  </main>
  <!-- <ContactSection /> -->
  <Footer />
</template>

<style scoped>
section {
  max-width: 50rem;
  margin: auto;
}

.dir {
  margin: 3rem;
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

.author {
  margin: auto;
  width: max-content;
  font-size: 22px;
  text-align: center;
  border-bottom: 3px solid rgb(0, 0, 0, 0.2);
}

.author:hover {
  cursor: pointer;
  border-bottom: 3px solid rgb(0, 0, 0);
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
  }
  h1 {
    padding: 0 1rem;
  }
}
</style>
