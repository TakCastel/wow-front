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
  },

  data: () => ({
    characters: [
      {
        name: 'Siddon Celestin',
        url: '/character/siddon-celestin',
        active: true,
        img: require('../../assets/images/characters/SiddonCelestin.png')
      },
      {
        name: 'Ko Kaasha',
        url: '/character/ko-kaasha',
        active: true,
        img: require('../../assets/images/characters/KoKaasha.png')
      },
      {
        name: 'Ra Chiranir',
        url: '/character/ra-chiranir',
        active: true,
        img: require('../../assets/images/characters/RaChiranir.png')
      },
      {
        name: 'DraKiseena',
        url: '/character/dra-kiseena',
        active: true,
        img: require('../../assets/images/characters/DraKiseena.png')
      }
    ]
  })
}
</script>
