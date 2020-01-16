/* eslint-disable no-param-reassign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Nprogress from 'nprogress';

import Error404 from '@/views/404.vue';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    async beforeEnter(to, from, next) {
      await store.dispatch('event/fetchCurrentEvent', to.params.id);
      to.params.event = store.state.event.currentEvent;
      next();
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '*',
    component: Error404,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
