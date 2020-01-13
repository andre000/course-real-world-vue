<template>
  <article>
    <h1>Event List</h1>

    <div class="event-list">
      <event-card v-for="event in events" :key="event.id" :event="event" />
    </div>

  </article>
</template>

<script>
import EventService from '@/services/EventService';
import EventCard from '@/components/EventCard.vue';

export default {
  components: {
    EventCard,
  },

  data() {
    return {
      events: [],
    };
  },

  created() {
    EventService.getEvents()
      .then(({ data }) => { this.events = data; })
      .catch(err => console.error(err));
  },
};
</script>

<style lang="scss" scoped>
</style>
