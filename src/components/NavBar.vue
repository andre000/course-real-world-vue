<template>
  <header class="nav">
    <router-link to="/" class="brand">
      <img src="@/assets/logo.svg" alt="logo" class="logo">
      Real World Events
    </router-link>
    <nav>
      <router-link :to="{ name: 'event-list' }">Events</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link>
    </nav>
  </header>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
  .logo {
    height: 18px;
    width: 20px;
  }
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>
