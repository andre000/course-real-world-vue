<template>
  <div class="notification-container">
    <notification-bar v-for="n in notifications" :key="n.id" :notification="n" />
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
</style>
