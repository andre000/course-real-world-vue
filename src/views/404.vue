 <template>
  <article>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.
    </h3>
    <router-link :to="{ name: 'event-list' }">Back to the home page</router-link>
  </article>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: 'page',
    },
  },
};
</script>

<style>

</style>
