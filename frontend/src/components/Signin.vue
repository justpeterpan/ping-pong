<template>
  <div class="signin-container">
    <form @submit.prevent="loginSubmit" class="login-form">
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />

      <button type="submit">sign in</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      store: this.$store.state,
    };
  },

  methods: {
    ...mapActions(['setPlayerState']),
    async loginSubmit() {
      const response = await fetch('http://localhost:3001/api/v1/auth/signin', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const data = await response.json();
      await this.setPlayerState(data.player.username);
      const redirectUrl = (window.location.href = `http://localhost:8080/#/player/${data.player.username}/`);
      return redirectUrl;
    },
  },
};
</script>

<style>
.signin-container {
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.login-form {
  display: grid;
  gap: 20px;
}

input {
  border: none;
  height: 24px;
  border-bottom: 1px dotted #2c3e50;
}

button {
  margin-top: 20px;
  border: 2px solid #2c3e50;
  height: 40px;
  background-color: white;
  cursor: pointer;
  box-shadow: 6px 6px #8bd78b;
}

button:active {
  box-shadow: 0px 0px #8bd78b;
  transform: translate(6px, 6px);
}
</style>
