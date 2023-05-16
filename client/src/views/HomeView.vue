<script setup>
  import Navbar from "../components/Navbar.vue";
  import Footer from "../components/Footer.vue";
  import ContactSection from '../components/ContactSection.vue';
  import HeroSection from '../components/HeroSection.vue';
  import NewestArticleSection from '../components/NewestArticleSection.vue';
</script>

<template>
  <nav>
    <Navbar />
  </nav>
  <section>
    <HeroSection/>
  </section>
  <section>
    <NewestArticleSection/>
  </section>
  <section>
    <ContactSection/>
  </section>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
* {
  color: white;
}

section {
  overflow: hidden;
  margin-bottom: 3rem;
}
</style>
