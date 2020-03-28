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
        <v-card>
          <v-img
            :src="caption"
            class="white--text align-end"
            height="200px"
          />
          <v-card-text>
            {{ character.name }}
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import marked from 'marked'

export default {
  validate ({ params }) {
    return true
  },

  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', url: '/characters' },
      { title: 'Feuille de personnage', active: true }
    ]
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
