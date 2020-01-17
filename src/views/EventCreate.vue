<template>
  <article>
    <h1>Create Event</h1>

    <form @submit.prevent="createEvent">
      <base-select
        v-model="event.category"
        label="Select a category"
        :options="categories"
        :class="{error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p
          class="errorMessage -text-error"
          v-if="!$v.event.category.required">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <base-input
        v-model="event.title"
        label="Title"
        type="text"
        :class="{error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
        placeholder="Add an event title"/>
      <template v-if="$v.event.title.$error">
        <p class="errorMessage -text-error" v-if="!$v.event.title.required"> Title is required.</p>
      </template>

      <base-input
        v-model="event.description"
        label="Description"
        type="text"
        :class="{error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
        placeholder="Add a description"/>
      <template v-if="$v.event.description.$error">
        <p
          class="errorMessage -text-error"
          v-if="!$v.event.description.required">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>
      <base-input
        v-model="event.location"
        label="Location"
        type="text"
        :class="{error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
        placeholder="Add a location"/>
      <template v-if="$v.event.location.$error">
        <p
          class="errorMessage -text-error"
          v-if="!$v.event.location.required">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
         :input-class="{ error: $v.event.date.$error }"
          @closed="$v.event.date.$touch()"
          placeholder="Select a date"/>
      </div>
      <template v-if="$v.event.date.$error">
        <p class="errorMessage -text-error" v-if="!$v.event.date.required"> Date is required.</p>
      </template>

      <base-select
        v-model="event.time"
        label="Select a time"
        :class="{error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
        :options="times"
      />
      <template v-if="$v.event.time.$error">
        <p class="errorMessage -text-error" v-if="!$v.event.time.required"> Time is required.</p>
      </template>

      <base-button
        type="submit"
        style="margin-top: 25px;"
        :disabled="$v.$anyError"
        button-class="-fill-gradient">
        Submit
      </base-button>

    </form>
  </article>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Nprogress from 'nprogress';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    Datepicker,
  },

  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
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
      this.$v.$touch();
      if (this.$v.$invalid) return;

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
