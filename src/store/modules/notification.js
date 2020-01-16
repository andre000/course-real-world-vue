let nextID = 1;

export default {
  namespaced: true,

  state: {
    notifications: [],
  },

  mutations: {
    PUSH(state, notification) {
      nextID += 1;
      state.notifications.push({
        ...notification,
        id: nextID,
      });
    },

    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        n => notificationToRemove.id !== n.id,
      );
    },
  },

  actions: {
    add({ commit }, notification) {
      commit('PUSH', notification);
    },
    remove({ commit }, notification) {
      commit('DELETE', notification);
    },
  },
  getters: {},
};
