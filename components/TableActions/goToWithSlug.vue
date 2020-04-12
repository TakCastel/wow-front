<template>
  <v-tooltip left color="grey darken-4">
    <template v-slot:activator="{ on }">
      <v-btn @click.prevent.stop="goToCharacterSheet(item.slug)" v-on="on" icon small>
        <v-icon small>
          mdi-clipboard-text
        </v-icon>
      </v-btn>
    </template>
    <span>Lire la fiche</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },

  methods: {
    goToCharacterSheet (url) {
      this.$router.push({ path: `/characters/${url}` })
    }
  }
}
</script>
