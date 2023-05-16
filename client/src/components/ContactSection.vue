<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import Button from './Button.vue';
  const name = ref('')
  const email = ref('')
  const message = ref('')

  const sendComment = async () => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/comments`, {
        name: name.value,
        email: email.value,
        message: message.value
      })
      if(!result) return
  
      name.value = ""
      email.value = ""
      message.value = ""
      alert("Comment Submitted")
    } catch (err) {
      console.log(err);
    }
  }
</script>

<template>
  <section>
    <div class="container">
      <h1>Do you have any question, sugestion, or feedback? I'd love to hear from you</h1>
      <form>
        <input @keyup.enter="sendComment" v-model="name" type="text" name="" id="" placeholder="Your Name">
        <input @keyup.enter="sendComment" v-model="email" type="text" name="" id="" placeholder="Your Email">
        <textarea @keyup.enter="sendComment" v-model="message" name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
        <Button text="Submit" @click.prevent="sendComment"/>
      </form>
    </div>
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
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
  }
    
  input, textarea {
    all: unset;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    background-color: #3D3D40;
    color: #B4B4B4;
    text-align: left;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    border: 3px solid transparent;
  }

  input:hover, textarea:hover {
    border: 3px solid #535356;
  }

  input:focus, textarea:focus {
    border: 3px solid #a56dfa;
    background-color: #1F1F23;
  }

  button {
    width: max-content;
    margin: auto;
    padding: 0.8rem 5rem;
    color: white;
    background-color: #7d41e1;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.9;
  }

</style>