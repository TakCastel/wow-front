<template>
  <v-row>
    <v-col class="d-flex justify-space-between" cols="12">
      <AuthenticatedActionButton
        @action="handleCreateEvent"
        :variant="{
          color: 'primary',
          large: true
        }"
        text="Nouveau"
        icon="mdi-plus-circle-outline"
      />
      <AuthenticatedActionButton
        @action="handleCreateReport"
        :variant="{
          color: 'secondary',
          large: true,
          outlined: true
        }"
        text="Écrire un Rapport"
        icon="mdi-script-text-outline"
      />
    </v-col>

    <v-col v-if="events.length < 1" xs="12" sm="6" md="4">
      <v-card>
        <v-card-text>
          Aucun article n'est disponible.
        </v-card-text>
      </v-card>
    </v-col>
    <story-card v-else v-for="(event, index) in events" :key="index" :content="event" />
  </v-row>
</template>

<script>
import AuthenticatedActionButton from '@/components/AuthenticatedActionButton'
import StoryCard from '@/components/Cards/StoryCard'

export default {
  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', active: true }
    ]
  },

  name: 'Wiki',

  components: {
    AuthenticatedActionButton,
    StoryCard
  },

  computed: {
    events () {
      const events = this.$store.state.articles.listOfArticles
      return events
        ? events.slice().filter(article => article.active === true)
        : null
    },

    // activeEvents () {
    //   return this.events
    //     ? this.events.slice().filter(article => article.active === true)
    //     : null
    // },

    isLoading () {
      return this.$store.state.articles.loadingEventArticles
    }
  },

  mounted () {
    this.$store.dispatch('articles/requestAllArticles')
  },

  methods: {
    handleCreateEvent () {
      this.$router.push({ path: 'content/add', query: { category: 'events' } })
    },

    handleCreateReport () {
      alert(`Cette action n'est pas supportée par la version alpha`)
    }
  }
}
</script>
