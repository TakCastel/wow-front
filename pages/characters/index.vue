<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>Liste des personnages</v-toolbar-title>
          <v-spacer />
          <AuthenticatedActionButton
            @action="handleCreate"
            :variant="{
              outlined: true
            }"
            text="Nouveau"
            icon="mdi-account-plus"
          />
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="characters"
          :items-per-page="5"
          :footer-props="{ 'items-per-page-options': [10, 25, 50, -1],
                           'items-per-page-text': 'Afficher :',
                           'items-per-page-all-text': 'Tous'}"
          :loading="isLoading"
          @click:row="handleView"
          loading-text="Chargement en cours..."
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="36">
              <img
                :src="item.avatar ? item.avatar.url : ''"
                :alt="item.name"
              >
            </v-avatar>
          </template>
          <template v-slot:item.actions="{ item }">
            <RedirectWithSlug :item="item" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RedirectWithSlug from '@/components/Actions/RedirectWithSlug'
import AuthenticatedActionButton from '@/components/Actions/AuthenticatedActionButton'

export default {
  meta: {
    title: 'Personnages',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', active: true }
    ]
  },

  components: {
    AuthenticatedActionButton,
    RedirectWithSlug
  },

  data: () => ({
    headers: [
      {
        text: 'Avatar',
        align: 'start',
        sortable: false,
        value: 'avatar'
      },
      { text: 'Nom', value: 'name' },
      { text: 'Classe', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    isLoading () {
      return this.$store.state.chara.loadingAllCharacters
    },

    characters () {
      const characters = this.$store.state.chara.listOfCharacters
      return characters
        ? characters.slice().filter(character => character.active === true)
        : null
    }
  },

  mounted () {
    this.$store.dispatch('chara/requestAllCharacters')
  },

  methods: {
    handleView (value) {
      this.$router.push({ path: `/characters/${value.slug}` })
    },

    handleCreate () {
      this.$router.push({
        path: 'content/add',
        query: {
          model: 'characters'
        }
      })
    }
  }
}
</script>

<style lang="scss">
tbody tr {
  cursor: pointer;
}
</style>
