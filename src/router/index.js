/* eslint-disable no-param-reassign */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Nprogress from 'nprogress';

import NetworkIssues from '@/views/503.vue';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    async beforeEnter(to, from, next) {
      try {
        await store.dispatch('event/fetchCurrentEvent', to.params.id);
        to.params.event = store.state.event.currentEvent;
        return next();
      } catch (err) {
        const notification = {
          type: 'error',
          message: `There was a problem fetching event #${to.params.id}: ${err.message}`,
        };

        if (err.response && err.response.status === 404) {
          store.dispatch('notification/add', notification, { root: true });
          return next({ name: 'not-found', params: { resource: 'event' } });
        }

        return next({ name: 'network-issues' });
      }
    },
  },
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
  },
  {
    path: '/404',
    name: 'not-found',
    props: true,
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/404.vue'),
  },
  {
    path: '/503',
    name: 'network-issues',
    component: NetworkIssues,
  },
  {
    path: '*',
    redirect: { name: 'not-found' },
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
