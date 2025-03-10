import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import event from '@/store/modules/event';
import notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
});
