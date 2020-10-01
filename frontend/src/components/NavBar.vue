<template>
  <div class="nav-bar">
    <router-link to="/table" v-if="store.player.isLoggedIn">table</router-link>
    <router-link
      :to="{ name: 'player', params: { id: store.player.username } }"
      v-if="store.player.isLoggedIn"
      v-model="store.player.username"
      >{{ store.player.username }}</router-link
    >
    <router-link to="/match/form" v-if="store.player.isLoggedIn"><strong>add Match</strong></router-link>
    <router-link to="/signin" v-if="!store.player.isLoggedIn">sign in</router-link>
    <router-link to="/signin" v-if="store.player.isLoggedIn" v-on:click="signout()">sign out</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      store: this.$store.state,
    };
  },
  methods: {
    ...mapActions(['setPlayerState']),
    async signout() {
      await fetch(`{process.env.VUE_APP_API_URL}/api/v1/auth/signout`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      this.setPlayerState('');
    },
  },
  // created() {
  //   this.getPlayerUserName();
  // },
};
</script>

<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  background-color: #8bd78b;
  box-shadow: 6px 6px #2c3e50;
}

.nav-bar a {
  margin: 10px;
  color: white;
  text-decoration: underline;
  text-decoration-style: dotted;
}

.nav-bar a:active {
  background-color: white;
  color: black;
}

.nav-bar a:last-of-type {
  margin-left: auto;
}
</style>
