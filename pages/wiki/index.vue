<template>
  <v-row>
    <v-col v-if="isLoading">
      <v-row>
        <v-col
          v-for="n in 6"
          :key="n.index"
          xs="12"
          sm="6"
          md="4"
        >
          <v-skeleton-loader
            class="mx-auto"
            type="card"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else>
      <v-row>
        <story-card v-for="(event, index) in events" :key="index" :content="event" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import StoryCard from '@/components/Cards/StoryCard'

export default {
  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', active: true }
    ]
  },

  components: {
    StoryCard
  },

  computed: {
    events () {
      const events = { ...this.$store.state.articles.articlesByCategories.filter(
        category => category.name === 'events'
      )[0] }
      return events.articles
    },

    isLoading () {
      return this.$store.state.articles.loadingEventArticles
    }
  },

  created () {
    this.$store.dispatch('articles/requestAllArticles')
  }
}
</script>
