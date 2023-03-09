<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const username = ref("");
const password = ref("");
const togglePassword = ref('password')
const warning = ref('')

const login = async () => {
  const endpoint = `http://localhost:3000/admin?username=${username.value}&password=${password.value}`;
  const result = await axios.get(endpoint);
  if (result.status == 200 && result.data.length) {
    localStorage.setItem('admin-info', JSON.stringify(result.data[0]))
    router.push({ name: "dashboard" });
  } else {
    // alert("User not found");
    warning.value = '* User not found'
  }
};

</script>

<template>
  <section>
    <div class="container">
      <h1>Log in to manage content</h1>
      <h6 class="warning">{{ warning }}</h6>
      <form>
        <label>Username</label>
        <input type="email" v-model="username" @input="warning = ''"/>
        <label>Password</label>
        <div class="pw">
          <input :type="togglePassword" v-model="password" @input="warning = ''"/>
          <button type="button" class="toggle" @click.prevent="togglePassword = togglePassword == 'password' ? 'text' : 'password'">
            <svg v-if="togglePassword == 'password'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            <svg v-if="togglePassword == 'text'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
          </button>
        </div>
        <a class="forgot-pw" href="#">Forgot password?</a>
        <button type="submit" class="login" @click.prevent="login" :disabled="username == '' || password == '' ? true : false" >Log in</button>
      </form>
    </div>
    <router-link to="/" class="link">Back to Homepage</router-link>
  </section>
</template>

<style scoped>

* {
  color: #efeff1;
}

section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}

.container {
  width: 30rem;
  padding: 2.5rem 1.5rem;
  border: 1px black solid;
  border-radius: 0.5rem;
  background-color: #18181b;
}

video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

h1 {
  text-align: center;
}

.warning {
  color: #a56dfa;
  margin-top: 2rem;
  margin-bottom: -0.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

input {
  all: unset;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  background-color: #3d3d40;
  border: 3px solid transparent;
}

input:hover {
  border: 3px solid #535356;
}

input:focus {
  border: 3px solid #a56dfa;
  background-color: black;
}

.pw {
  display: grid;
  grid-template-columns: 8fr 1fr;
  gap: 0.5rem;
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-pw {
  all: unset;
  color: #a56dfa;
  margin-top: 0.2rem;
  width: max-content;
}
.forgot-pw:hover {
  color: #772ce8;
  cursor: pointer;
}

.pw button {
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  background-color: #a56dfa;
  border-color: #a56dfa;
}

button.login {
  margin-top: 1.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  background-color: #a56dfa;
  border-color: #a56dfa;
}

button:hover {
  background-color: #772ce8;
}

button:disabled {
  background-color: #232328;
  border-color: transparent;
  color: #606067;
  border-color: transparent;
}

.link {
  color: black;
  margin-top: 1rem;
}

.link:hover {
  opacity: 0.8;
}
</style>
