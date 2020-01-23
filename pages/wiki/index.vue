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

  data: () => ({
    events: [
      {
        title: 'Le Cairn des Âmes',
        url: '/wiki/cairn-des-ames',
        active: false,
        img: require('../../assets/images/wallpapers/trame1.jpg')
      },
      {
        title: 'Le Coeur de Jhunal',
        url: '/wiki/coeur-de-jhunal',
        active: false,
        img: require('../../assets/images/wallpapers/trame2.jpg')
      },
      {
        title: 'Les Ruines de Rkunzelft',
        url: '/wiki/ruines-de-rkunzelft',
        active: true,
        img: require('../../assets/images/wallpapers/trame3.jpg')
      }
    ]
  })
}
</script>
