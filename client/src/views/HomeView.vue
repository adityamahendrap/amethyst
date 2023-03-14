<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <section>
    <Navbar />
    <div class="container hero-section ">
      <div class="text ">
        <h1>Hello there 👋</h1>
        <p>
          Welcome to my little corner of the internet. I'm so exited to have you
          here. This website is where ishare my thoughts, ideas, experiences on
          a variety of topics that interest me.
        </p>
      </div>
      <div class="hero-image">
        <img src="../assets/test2.png" />
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
section {
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-section {
  display: flex;
  align-items: center;
}

img {
  width: 35rem;
}

.hero-section .text {
  color: white;
  padding: 0 2rem;
}

h1 {
  font-weight: bold;
}

@media (max-width:991px) {
  .hero-section {
    flex-direction: column;
  }
  .hero-image {
    margin-top: 2rem;
  }
}
@media (max-width:588px) {
  img {
    width: 25rem;
  }
}
@media (max-width:431px) {
  img {
    width: 17rem;
  }
}



</style>
