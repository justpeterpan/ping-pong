<template>
  <div class="nav-bar">
    <h2>PingPong</h2>
    <router-link to="/">home</router-link>
    <router-link to="/">table</router-link>
    <router-link to="/">stats</router-link>
  </div>
</template>

<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  background-color: antiquewhite;
}

.nav-bar a {
  margin: 10px;
  text-decoration: none;
}
</style>
