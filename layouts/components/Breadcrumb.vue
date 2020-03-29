<template>
  <v-card id="breadcrumb" class="mb-5" flat color="#272727">
    <v-card-text>
      <span
        v-for="path in generatedBreadcrumb"
        :key="path.title"
        :class="[path.active ? 'strong white--text' : '']"
        class="breadcrumb"
      >
        <nuxt-link v-if="path.url" :to="path.url">{{ path.title }}</nuxt-link>
        <span v-else>{{ path.title }}</span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    generatedBreadcrumb () {
      return this.$store.state.pageBreadcrumb
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb + .breadcrumb {
  margin-left: .5rem;
  &.breadcrumb::before {
    content: '/';
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
  }
}
</style>
