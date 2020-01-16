<template>
  <div id="app">
    <nav-bar />
    <notification-container />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
    NotificationContainer,
  },
};
</script>

<style lang="scss">
@import 'src/assets/theme.scss';

#app {
  color: #2c3e50;
}
</style>
