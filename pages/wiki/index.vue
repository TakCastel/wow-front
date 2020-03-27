<template>
  <v-row>
    <story-card v-for="(event, index) in events" :key="index" :content="event" />
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
    // events () {
    //   return this.$store.getters.articles.articlesInEventCategory
    // }
    events () {
      const events = { ...this.$store.state.articles.articlesByCategories.filter(
        category => category.name === 'events'
      )[0] }
      return events.articles
    }
  },

  created () {
    this.$store.dispatch('articles/requestAllArticles')
  }
}
</script>
