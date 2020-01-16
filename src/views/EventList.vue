<template>
  <article>
    <h1>Event for {{ user.name }}</h1>

    <div class="event-list">
      <event-card v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="pagination">
      <router-link
        v-if="page !== 1"
        rel="prev"
        :to="{name: 'event-list', query: { page: page - 1 }}">
        Prev
      </router-link>
      <router-link
        v-if="page < totalOfEvents / 3"
        :to="{name: 'event-list', query: { page: page + 1 }}">
        Next
      </router-link>
    </div>

  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventCard from '@/components/EventCard.vue';

export default {
  components: {
    EventCard,
  },

  computed: {
    page() {
      return ~~this.$route.query.page || 1;
    },

    ...mapState('event', ['events', 'totalOfEvents']),
    ...mapState('user', ['user']),
  },

  methods: {
    ...mapActions('event', ['fetchEvents']),
  },

  created() {
    this.fetchEvents({
      page: this.page,
      limit: 3,
    });
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
