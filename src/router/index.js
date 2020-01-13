import Vue from 'vue';
import VueRouter from 'vue-router';

import EventCreate from '../views/EventCreate.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
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
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
