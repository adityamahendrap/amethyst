<script setup></script>

<template>
  <section>
    <h1>Do you have any question, sugestion, or feedback? I'd love to hear from you</h1>
    <form action="">
      <input type="text" name="" id="" placeholder="Your Name">
      <input type="text" name="" id="" placeholder="Your Email">
      <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
      <button>Submit</button>
    </form>
  </section>
</template>

<style scoped>
  section {
    margin: 7rem auto ;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 61rem;
    padding: 1rem;
  }
  
  h1 {
    text-align: center; 
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
  }

  input, textarea {
    padding: 1rem;
  }

  button {
    width: max-content;
    margin: auto;
    padding: 0.8rem 5rem;
    color: white;
    background-color: #222222;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.9;
  }

  @media (max-width: 997px) {

  }
</style>