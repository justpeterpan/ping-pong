<template>
  <div class="nav-bar">
    <router-link to="/">home</router-link>
    <router-link to="/table">table</router-link>
  </div>
</template>

<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  background-color: #8bd78b;
}

.nav-bar a {
  margin: 10px;
  color: white;
  text-decoration: none;
}

.nav-bar a:active {
  background-color: white;
  color: black;
}
</style>
