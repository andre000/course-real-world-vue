import EventService from '@/services/EventService';

export default {
  namespaced: true,

  state: {
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [],
    currentEvent: {},
    totalOfEvents: 0,
    perPage: 3,
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_OF_EVENTS(state, totalOfEvents) {
      state.totalOfEvents = totalOfEvents;
    },
    SET_CURRENT_EVENT(state, event) {
      state.currentEvent = event;
    },
  },

  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event);

        const notification = {
          type: 'success',
          message: `Event #${event.id} created successfully!`,
        };

        dispatch('notification/add', notification, { root: true });
      }).catch((err) => {
        const notification = {
          type: 'error',
          message: `There was a problem creating event: ${err.message}`,
        };

        dispatch('notification/add', notification, { root: true });
        throw err;
      });
    },

    fetchEvents({ commit, dispatch, state }, { limit }) {
      return EventService.getEvents(state.perPage, limit)
        .then(({ data, headers }) => {
          commit('SET_EVENTS', data);
          commit('SET_TOTAL_OF_EVENTS', headers['x-total-count']);
        }).catch((err) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching events: ${err.message}`,
          };

          dispatch('notification/add', notification, { root: true });
        });
    },

    fetchCurrentEvent({ commit, getters, dispatch }, id) {
      const event = getters.getEventByID(id);
      if (event) {
        return commit('SET_CURRENT_EVENT', event);
      }

      return EventService.getEvent(id)
        .then(({ data }) => { commit('SET_CURRENT_EVENT', data); })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching event #${id}: ${err.message}`,
          };

          dispatch('notification/add', notification, { root: true });
        });
    },
  },

  getters: {
    getEventByID: store => id => store.events.find(e => e.id === id),
  },
};
