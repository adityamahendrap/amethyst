<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const router = useRouter();

const data = ref();
const title = ref();
const tag = ref();
const imageUrl = ref();
const description = ref();
const paragraph = ref();

const getData = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/articles/${route.params.id}`
  );
  const _data = result.data.payload.datas[0];
  data.value = result.data.payload.datas;
  title.value = _data.title;
  tag.value = _data.tag;
  imageUrl.value = _data.image;
  description.value = _data.description;
  paragraph.value = _data.paragraph;
};

const updateData = async () => {
  try {

    const result = await axios.put(
      `${import.meta.env.VITE_API_ENDPOINT}/articles/${route.params.id}`,
      {
        title: title.value,
        tag: tag.value,
        image: imageUrl.value,
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
  } catch(err) {
    if(err.response.status == 400) alert(err.response.data.payload.messages);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <section>
    <h1>Edit</h1>
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
    <div class="editor">
      <QuillEditor theme="snow" v-model:content="paragraph" toolbar="full" content-type="html"/>
    </div>
    <button @click.prevent="updateData">Save</button>
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
.editor {
  background-color: white;
}
</style>
