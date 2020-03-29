<template>
  <v-row>
    <v-col v-if="activeEvents && activeEvents.length < 1" xs="12" sm="6" md="4">
      <v-card>
        <v-card-text>Aucun article disponible</v-card-text>
      </v-card>
    </v-col>
    <story-card v-else v-for="(event, index) in activeEvents" :key="index" :content="event" />
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

    activeEvents () {
      return this.events
        ? this.events.slice().filter(article => article.active === true)
        : null
    },

    isLoading () {
      return this.$store.state.articles.loadingEventArticles
    }
  },

  mounted () {
    this.$store.dispatch('articles/requestAllArticles')
  }
}
</script>
