<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const data = ref();
const title = ref();
const tag = ref();
const description = ref();
const paragraph = ref();

const getData = async () => {
  const result = await axios.get(
    `http://localhost:5000/articles/${route.params.id}`
  );
  const _data = result.data.payload.datas[0]
  data.value = result.data.payload.datas;
  title.value = _data.title;
  tag.value = _data.tag;
  description.value = _data.description;
  paragraph.value = _data.paragraph;
};

const updateData = async () => {
  const result = await axios.put(
    `http://localhost:5000/articles/${route.params.id}`,
    {
      title: title.value,
      tag: tag.value,
      createdAt: data.value.createdAt,
      lastUpdated: Date.now(),
      description: description.value,
      paragraph: paragraph.value,
      id: route.params.id,
    }
  );
  if (result.status == 201) {
    alert("update berhasil");
    router.push({ name: "dashboard" });
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <h1>Edit</h1>
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
