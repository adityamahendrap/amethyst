<script setup>
import Navboard from "../components/Navboard.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
// console.log(route.params.id);

const data = ref()
const title = ref();
const tag = ref();
const description = ref();
const paragraph = ref();

const getData = async () => {
  const result = await axios.get(
    `http://localhost:3000/articles/${route.params.id}`
  );
  data.value = result.data
  title.value = result.data.title;
  tag.value = result.data.tag;
  description.value = result.data.description;
  paragraph.value = result.data.paragraph[0].content;
  // console.log(data.value.date.createdAt);
};

const updateData = async () => {
  const result = await axios.put(
    `http://localhost:3000/articles/${route.params.id}`,
    {
      title: title.value,
      tag: tag.value,
      date: {
        createdAt: data.value.date.createdAt,
        lastUpadted: null,
      },
      description: description.value,
      paragraph: [
        {
          content: paragraph.value,
          id: 1,
        }
      ],
      id: route.params.id
    }
  );
  if(result.status == 200) {
    alert('update berhasil')
    router.push({name: 'dashboard'})
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <!-- {{ data }} -->
  <h1>Edit</h1>
  <!-- <Navboard /> -->
  <router-link to="/dashboard">Back</router-link>
  <section>
    <label>Judul</label>
    <input type="text" v-model="title" />
    <label>Tag</label>
    <input type="text" v-model="tag" />
    <label>Deskripsi</label>
    <input type="text" v-model="description" />
    <span>
      <label>Isi</label>
      <textarea cols="30" rows="5" v-model="paragraph"></textarea>
    </span>
    <button @click.prevent="updateData">Save</button>
  </section>
</template>

<style scoped>
section,
section span {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
}
</style>
