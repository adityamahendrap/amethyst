<script setup></script>

<template>
  <kinesis-container>
    <div class="container hero-section">
      <div class="text">
        <h1>Hello there 👋</h1>
        <p>
          Welcome to my little corner of the internet. I'm so exited to have
          you here. This website is where ishare my thoughts, ideas,
          experiences on a variety of topics that interest me.
        </p>
      </div>
      <kinesis-element :strength="20">
      <div class="hero-image">
          <img src="../assets/hero.png" />
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
}

img {
  width: 35rem;
}

.hero-section .text {
  color: white;
  padding: 0 1rem;
}

h1 {
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
}

@media (max-width: 991px) {
  .hero-section {
    flex-direction: column;
  }
  
  .hero-image {
    margin-top: 2rem;
  }
}

@media (max-width: 588px) {
  img {
    width: 25rem;
  }
}

@media (max-width: 431px) {
  img {
    width: 17rem;
  }
}
</style>