import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
  INTERCEPTORS EXAMPLE
  apiClient.interceptors.request.use((config) => {
    Nprogress.start();
    return config;
  });
  apiClient.interceptors.response.use((response) => {
    Nprogress.done();
    return response;
  });
 */

export default {
  getEvents(page = 1, limit = 3) {
    return apiClient.get(`/events?_limit=${limit}&_page=${page}`);
  },

  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },

  postEvent(event) {
    return apiClient.post('/events', event);
  },
};
