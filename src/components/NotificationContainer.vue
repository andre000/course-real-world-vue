<template>
  <div class="notification-container">
    <transition-group name="notification-list">
      <notification-bar v-for="n in notifications" :key="n.id" :notification="n" />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationBar from '@/components/NotificationBar.vue';

export default {
  components: {
    NotificationBar,
  },

  computed: {
    ...mapState('notification', ['notifications']),
  },
};
</script>

<style scoped>
  .notification-container {
    position: fixed;
    bottom: 0;
    right: 0;
    padding-right: 40px;
  }
  .notification-list-enter-active,
  .notification-list-leave-active {
    transition: all 1s;
  }

  .notification-list-enter,
  .notification-list-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
</style>
