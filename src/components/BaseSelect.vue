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
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>

</style>
