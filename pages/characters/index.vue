<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>Liste des personnages</v-toolbar-title>
          <v-spacer />
          <v-btn outlined>
            <v-icon left>
              mdi-account-plus
            </v-icon>
            Nouveau
          </v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="characters"
          :items-per-page="5"
          :footer-props="{ 'items-per-page-options': [10, 25, 50, -1],
                           'items-per-page-text': 'Afficher :',
                           'items-per-page-all-text': 'Tous'}"
          :loading="isLoading"
          @click:row="handleClick"
          class="#202020"
          loading-text="Chargement en cours..."
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="36">
              <img
                :src="item.avatar.url"
                :alt="item.name"
              >
            </v-avatar>
          </template>
          <template v-slot:item.actions="{ item }">
            <goToWithSlug :item="item" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import goToWithSlug from '@/components/TableActions/goToWithSlug'

export default {
  meta: {
    title: 'Personnages',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', active: true }
    ]
  },

  components: {
    goToWithSlug
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
      return this.$store.state.chara.listOfCharacters
    }
  },

  mounted () {
    this.$store.dispatch('chara/requestAllCharacters')
  },

  methods: {
    handleClick (value) {
      this.$router.push({ path: `/characters/${value.slug}` })
    }
  }
}
</script>

<style lang="scss">
tbody tr {
  cursor: pointer;
}
</style>
