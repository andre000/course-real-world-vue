<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs" v-on="$listeners">
      <option
        v-for="option in options"
        :selected="option === value"
        :key="option">
          {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    label: {
      type: String,
    },

    options: {
      type: Array,
      required: true,
    },

    value: {
      type: [String, Number],
    },
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style>

</style>
