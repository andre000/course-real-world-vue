<template>
  <div id="app">
    <nav-bar />
    <notification-container />
    <transition name="spin">
      <router-view :key="$route.fullPath"/>
    </transition>
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

$max-width: calc(500px - 40px);

#app {
  color: #2c3e50;
}

.spin-enter, .spin-leave-to {
  width: $max-width !important;
  transform: rotateY(-90deg);
  opacity: 0;
}

.spin-enter-active {
  width: $max-width !important;
  position: absolute;
  transform-origin: 0% 0%;
  transition: all .6s ease-in;
}
.spin-leave-active {
  width: $max-width !important;
  position: absolute;
  transform-origin: 540px 100%;
  transition: all .6s ease-out;
}


</style>
