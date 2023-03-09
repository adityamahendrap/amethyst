<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <!-- <section> -->
    <Navbar />
    <Footer />

    <!-- <div class="center">
      <div class="image"></div>
      <h2>Aditya Mahendra</h2>
      <p>Owner</p>
    </div>
  </section> -->

  <!-- <section>
    <h1>Popular Article</h1>
    <div class="container">
      <div class="card">
        <h3>judul</h3>
        <p class="date">JAN, 22, 2022</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quibusdam ex sunt!</p>
        <button>Read Article</button>
      </div>
      <div class="card">
        <h3>judul</h3>
        <p class="date">JAN, 22, 2022</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quibusdam ex sunt!</p>
        <button>Read Article</button>
      </div>
    </div>
  </section> -->
</template>

<style scoped>
  section {
    height: 100vh;
    text-align: center;
  }
  .center {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    text-align: center;
  }

  .image {
    width: 15rem;
    height: 15rem;
    background-color: #222222;
    border-radius: 100%;
    margin-bottom: 1rem;
  }


  section:nth-child(2) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    margin-top: -6rem;
    margin-bottom: 2rem;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 0 2rem;
  }

  .card {
    background-color: #222222;
    text-align: start;
    width: 20rem;
    padding: 1rem;
  }

  .card > * {
    color: white;
  }

  .date {
    margin-bottom: 1.5rem;
  }

  .card button {
    margin-top: 2rem;
    color: #222222;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
</style>
