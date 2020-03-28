<template>
  <v-row>
    <v-col>
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title>Liste des personnages</v-toolbar-title>
        </v-toolbar>
        <v-list>
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
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  meta: {
    title: 'Membres',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Personnages', active: true }
    ]
  },

  computed: {
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
    }
  }
}
</script>
