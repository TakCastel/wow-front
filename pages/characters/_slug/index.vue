<template>
  <v-row>
    <v-col
      :order="$vuetify.breakpoint.xsOnly ? 3 : 1"
      xs="12"
      sm="8"
    >
      <v-skeleton-loader
        :loading="isLoading"
        height="300px"
        type="article"
      >
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>{{ character.name }}</v-toolbar-title>
            <v-spacer />
            <v-btn v-if="isAuthenticated" @click="handleEdit" icon>
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <ConfirmDeletionModale v-if="isAuthenticated" :id="character.id" model="characters" />
          </v-toolbar>
          <v-card-text v-if="character.description" v-html="compiledMarkdown(character.description)" class="article mt-5 white--text" />
        </v-card>
      </v-skeleton-loader>
    </v-col>

    <v-col xs="12" sm="4" order="2">
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
          <v-card-text v-html="character.infobox" class="pa-3 white--text" />
        </v-card>
      </v-skeleton-loader>
      <TalentCard v-for="talent in sortedTalents" :key="talent.id" :talent="talent" />
    </v-col>
  </v-row>
</template>

<script>
import marked from 'marked'
import ConfirmDeletionModale from '@/components/Actions/ConfirmDeletionModale'
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
    ConfirmDeletionModale,
    TalentCard
  },

  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },

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
    },

    handleEdit () {
      this.$router.push({
        path: '/content/edit',
        query: {
          model: 'characters',
          slug: this.$route.params.slug
        }
      })
    }
  }
}
</script>
