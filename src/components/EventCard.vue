<template>
  <router-link class="event-link" :to="{ name: 'event-show', params: { id: event.id } }">
    <section class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <base-icon name="users">{{ event.attendees.length }} attending</base-icon>
    </section>
  </router-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/variables.scss';

.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}

</style>
