<script setup>
import Navboard from "../components/Navboard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const datas = ref();
const router = useRouter();

const getAllData = async () => {
  const result = await axios.get(`http://localhost:5000/articles`);
  if (result.status == 200) {
    datas.value = result.data.payload.datas;
  }
};

const deleteData = async (id) => {
  const result = await axios.delete(`http://localhost:5000/articles/${id}`);
  getAllData();
};

const paragraphs = ref();
const getParagraphs = (id) => {
  paragraphs.value = datas.value.filter((data) => data.id == id);
  paragraphs.value = paragraphs.value[0].paragraph
};

const convertTime = (unix) => new Date(unix).toLocaleDateString("en-US")

onMounted(() => {
  let admin = localStorage.getItem("admin-info");
  if (!admin) {
    router.push({ name: "login" });
  }

  getAllData();
});
</script>

<template>
  <h1>Dashboard</h1>
  
  <router-link to="/add">Add Article</router-link>
  
  <table class="table">
    <thead class="table-light">
      <tr>
        <th scope="col">No</th>
        <th scope="col">Title</th>
        <th scope="col">Tag</th>
        <th scope="col">Description</th>
        <th scope="col">Paragraph</th>
        <th scope="col">created</th>
        <th scope="col">last updated</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody class="table-dark">
      <tr v-for="(data, index) in datas" :key="data.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ data.title }}</td>
        <td>#{{ data.tag }}</td>
        <td>{{ data.description }}</td>
        <td>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="getParagraphs(data.id)"
          >
            See
          </button>
        </td>
        <td>{{ convertTime(data.createdAt) }}</td>
        <td>{{ data.lastUpdated == null ? '-' :  convertTime(data.lastUpdated)}}</td>
        <td><router-link :to="`/edit/${data.id}`">Edit</router-link></td>
        <td><button class="btn btn-danger" @click="deleteData(data.id)">X</button></td>
      </tr>
    </tbody>
  </table>
  <Navboard />

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Paragraph</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
            <p>{{paragraphs}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 80%;
  margin: auto;
  text-align: center;
}
</style>
