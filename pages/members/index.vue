<template>
  <v-row>
    <chara-card v-for="(character, index) in characters" :key="index" :content="character" />
  </v-row>
</template>

<script>
import CharaCard from '@/components/Dashboard/CharaCard'

export default {
  meta: {
    title: 'Membres',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Liste des membres', active: true }
    ]
  },

  components: {
    CharaCard
  }
}
</script>
