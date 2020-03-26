<template>
  <v-row>
    <story-card v-for="(event, index) in events" :key="index" :content="event" />
  </v-row>
</template>

<script>
import StoryCard from '@/components/Dashboard/StoryCard'

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
      return this.$store.state.events.articles
    }
  },

  beforeMount () {
    this.$store.dispatch('events/requestAllEvents')
    console.log('coucou')
  }
}
</script>
