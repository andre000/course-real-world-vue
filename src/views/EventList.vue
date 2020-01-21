
<template>
  <article>
    <h1>Event for {{ user.name }}</h1>

    <div class="event-list">
      <transition-group
        @before-enter="animBeforeEnter"
        @enter="animEnter"
        :css="false"
        mode="out-in"
        appear>
        <event-card v-for="event in events" :key="event.id" :event="event" />
      </transition-group>
    </div>

    <div class="pagination">
      <router-link
        v-if="page !== 1"
        rel="prev"
        :to="{name: 'event-list', query: { page: page - 1 }}">
        Prev
      </router-link>
      <router-link
        v-if="page < totalOfEvents / perPage"
        :to="{name: 'event-list', query: { page: page + 1 }}">
        Next
      </router-link>
    </div>

  </article>
</template>

<script>
/* eslint-disable no-param-reassign */

import { mapState, mapActions } from 'vuex';
import GSAP from 'gsap';
import EventCard from '@/components/EventCard.vue';
import store from '@/store/index';

async function getPageEvents(to, from, next) {
  const currentPage = ~~to.query.page || 1;
  await store.dispatch('event/fetchEvents', {
    page: currentPage,
  });
  to.params.page = currentPage;
  next();
}

export default {
  components: {
    EventCard,
  },

  props: {
    page: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState('event', ['events', 'totalOfEvents', 'perPage']),
    ...mapState('user', ['user']),
  },

  methods: {
    animBeforeEnter(el) {
      el.children[0].style.transform = 'translateX(-10px)';
      el.children[0].style.opacity = 0;
    },
    animEnter(el, done) {
      GSAP.to('.event-card', {
        x: 0,
        opacity: 1,
        delay: 0.333,
        duration: 0.333,
        stagger: 0.2,
        ease: 'back',
        onComplete: done,
      });
    },
    ...mapActions('event', ['fetchEvents']),
  },

  beforeRouteEnter: getPageEvents,

  beforeRouteUpdate: getPageEvents,
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
