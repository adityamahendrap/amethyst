<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("");
const tag = ref("");
const imageUrl = ref("");
const description = ref("");
const paragraph = ref("");

const addData = async () => {
  const result = await axios.post(`http://localhost:5000/articles`, {
    title: title.value,
    tag: tag.value,
    createdAt: Date.now(),
    lastUpdated: null,
    description: description.value,
    paragraph: paragraph.value,
    image: imageUrl.value
  });

  if (result.status == 201) {
    console.log("ok");
    alert("berhasil ditambahkan");
    router.push({ name: "dashboard" });
  }
};
</script>

<template>
  <section>
    <h1>Add</h1>
    <router-link class="red" to="/dashboard">Back</router-link>
    <label>Judul</label>
    <input type="text" v-model="title" />
    <label>Tag</label>
    <input type="text" v-model="tag" />
    <label>Deskripsi</label>
    <input type="text" v-model="description" />
    <label>Image url</label>
    <textarea cols="30" rows="5" v-model="imageUrl"></textarea>
    <label>Isi</label>
    <textarea cols="30" rows="5" v-model="paragraph"></textarea>
    <button @click.prevent="addData">Add</button>
  </section>
</template>

<style scoped>
.red {
  color: red;
}
h1 {
  color: white;
  margin: auto;
  padding: 3rem;
}

label {
  color: white;
  margin-top: 1rem;
}
section {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}
button {
  margin: auto;
  margin-top: 3rem;
  padding: 0.5rem 3rem;
  margin-bottom: 3rem;
  width: max-content;
}
</style>
