<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'event-list' }">Events</router-link> |
      <router-link :to="{ name: 'event-show' }">Show #1</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'src/assets/theme.scss';

#app {
    color: #2c3e50;
}
</style>
