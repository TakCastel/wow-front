<template>
  <v-row>
    <v-col cols="8">
      <v-skeleton-loader
        :loading="isLoading"
        height="300px"
        type="article"
      >
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>{{ character.name }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="character.description" v-html="compiledMarkdown(character.description)" class="article mt-5" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col cols="4">
      <v-skeleton-loader
        :loading="isLoading"
        type="image, article"
      >
        <v-card class="mb-3">
          <v-img
            :src="caption"
            class="white--text align-end"
            height="auto"
          />
          <v-card-title class="subtitle-2 pa-2">
            Légende
          </v-card-title>
          <v-card-text v-html="character.infobox" class="pa-2 pt-0" />
        </v-card>
      </v-skeleton-loader>
      <TalentCard v-for="talent in sortedTalents" :key="talent.id" :talent="talent" />
    </v-col>
  </v-row>
</template>

<script>
import marked from 'marked'
import TalentCard from '@/components/Cards/TalentCard'

export default {
  validate ({ params }) {
    return true
  },

  name: 'CharacterPage',

  meta: {
    title: 'Personnage',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', url: '/characters' },
      { title: 'Feuille de personnage', active: true }
    ]
  },

  components: {
    TalentCard
  },

  computed: {
    character () {
      return this.$store.state.chara.currentCharacter ? this.$store.state.chara.currentCharacter : false
    },

    caption () {
      return this.character.avatar ? this.character.avatar.url : ''
    },

    isLoading () {
      return this.$store.state.chara.loadingCurrentCharacter
    },

    sortedTalents () {
      return this.character.talents
        ? this.character.talents.slice().sort((a, b) => (a.type > b.type) ? 1 : -1)
        : undefined
    }
  },

  mounted () {
    this.$store.dispatch('chara/requestCharacterBySlug', this.$route.params.slug)
  },

  methods: {
    compiledMarkdown (text) {
      return marked(text)
    }
  }
}
</script>
