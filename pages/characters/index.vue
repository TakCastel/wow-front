<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>Liste des personnages</v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="characters"
          :items-per-page="5"
          :footer-props="{ 'items-per-page-options': [10, 25, 50, -1],
                           'items-per-page-text': 'Afficher :',
                           'items-per-page-all-text': 'Tous'}"
          :loading="isLoading"
          loading-text="Chargement en cours..."
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar @click="handleClick(item.slug)" size="36" class="cursor-pointer">
              <img
                :src="item.avatar.url"
                :alt="item.name"
              >
            </v-avatar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip left color="grey darken-4">
              <template v-slot:activator="{ on }">
                <v-btn @click="handleClick(item.slug)" v-on="on" icon small>
                  <v-icon small>
                    mdi-clipboard-text
                  </v-icon>
                </v-btn>
              </template>
              <span>Lire la fiche</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <!-- <v-list>
          <v-list-item
            v-for="character in characters"
            :key="character.id"
            @click="handleClick(character.slug)"
            two-line
          >
            <v-list-item-avatar>
              <v-img :src="character.avatar.url" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="character.name" />
              <v-list-item-subtitle v-text="character.role" />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="handleThing" icon>
                <v-icon color="grey lighten-1">
                  mdi-information
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  meta: {
    title: 'Personnages',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', active: true }
    ]
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
      // { text: 'Groupe', value: 'rank' },
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
    handleClick (url) {
      this.$router.push({ path: `/characters/${url}` })
    },

    handleThing () {
      console.log('do something')
    }
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer
}
</style>
