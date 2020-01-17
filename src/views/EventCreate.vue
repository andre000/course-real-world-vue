<template>
  <article>
    <h1>Create Event</h1>

    <form @submit.prevent="createEvent">
      <base-select
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>
      <base-input
        v-model="event.title"
        label="Title"
        type="text"
        placeholder="Add an event title"/>
      <base-input
        v-model="event.description"
        label="Description"
        type="text"
        placeholder="Add a description"/>

      <h3>Where is your event?</h3>
      <base-input
        v-model="event.location"
        label="Location"
        type="text"
        placeholder="Add a location"/>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <base-select
        v-model="event.time"
        label="Select a time"
        :options="times"
      />

      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </article>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Nprogress from 'nprogress';
import { mapState } from 'vuex';

export default {
  components: {
    Datepicker,
  },

  data() {
    const times = Array(24)
      .fill()
      .map((d, i) => `${i}:00`);

    return {
      event: this.createFreshEvent(),
      times,
    };
  },

  computed: {
    ...mapState('event', ['categories']),
  },

  methods: {
    createEvent() {
      Nprogress.start();
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          });
          this.event = this.createFreshEvent();
        })
        .catch(() => {
          Nprogress.done();
        });
    },
    createFreshEvent() {
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        category: '',
        organizer: this.$store.state.user.user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
