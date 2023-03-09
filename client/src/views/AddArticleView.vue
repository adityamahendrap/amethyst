<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import Navboard from "../components/Navboard.vue";
import {useRouter} from 'vue-router';

const router = useRouter()
const title = ref("");
const tag = ref("");
const description = ref("");
const paragraph = ref("");

const addData = async () => {
  const result = await axios.post(`http://localhost:3000/articles`, {
    title: title.value,
    tag: tag.value,
    date: {
      createdAt: Date.now(),
      lastUpdated: null,
    },
    description: description.value,
    paragraph: [
      {
        content: paragraph.value,
        id: 1,
      },
    ],
  });

  if(result.status == 201) {
    console.log('ok');
    alert('berhasil ditambahkan')
    router.push({name: 'dashboard'})
  }
};
</script>

<template>
  <h1>Add</h1>
  <router-link to="/dashboard">Back</router-link>
  <section>
    <label>Judul</label>
    <input type="text" v-model="title" />
    <label>Tag</label>
    <input type="text" v-model="tag" />
    <label>Deskripsi</label>
    <input type="text" v-model="description" />
    <label>Isi</label>
    <textarea cols="30" rows="5" v-model="paragraph"></textarea>
    <button @click.prevent="addData">Add</button>
  </section>
</template>

<style scoped>
section {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
}
</style>
