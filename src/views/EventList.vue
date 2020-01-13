<template>
  <article>
    <h1>Event List</h1>

    <div class="event-list">
      <event-card />
    </div>

  </article>
</template>

<script>
import EventCard from '@/components/EventCard.vue';

export default {
  components: {
    EventCard,
  },
};
</script>

<style lang="scss" scoped>
</style>
