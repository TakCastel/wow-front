<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      v-if="talent"
      :class="hover ? `${talentParams.color} lighten-1` : talentParams.color"
      :elevation="hover ? 12 : 2"
      class="mb-1 transitional"
    >
      <v-tooltip left color="grey darken-1" max-width="320">
        <template v-slot:activator="{ on }">
          <v-card-title v-on="on" class="subtitle-2 pa-2 text-uppercase">
            <v-icon left small>
              {{ talentParams.icon }}
            </v-icon>
            {{ talent.name }}
          </v-card-title>
        </template>
        <span>{{ talentParams.hint }}</span>
      </v-tooltip>
      <v-card-text v-html="talent.description" class="pa-2 pt-0 white--text" />
    </v-card>
  </v-hover>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    talent: {
      type: Object,
      required: true
    }
  },

  computed: {
    talentParams () {
      switch (this.talent.type) {
        case 'active': return {
          icon: 'mdi-bullseye-arrow',
          color: 'primary',
          hint: `Ce don est une compétence active, ce personnage peut l'activer à n'importe quel moment durant une partie.`
        }
        case 'passive': return {
          icon: 'mdi-bullseye',
          color: 'secondary',
          hint: `Ce don est une compétence passive, son effet s'applique sur le personnage durant toute la durée de la partie.`
        }
        case 'reactive': return {
          icon: 'mdi-clock-in',
          color: 'alert',
          hint: `Ce don est une compétence réactive, ce personnage peut l'activer dès que sa condition est remplie.`
        }
        case 'weakness': return {
          icon: 'mdi-shield-off',
          color: 'error',
          hint: `Ceci est une faiblesse, elle est appliquée au personnage durant toute la durée de la partie.`
        }
        case 'earned': return {
          icon: 'mdi-sack',
          color: 'success',
          hint: `Ce don a été accordé à ce personnage durant un évènement spécial.`
        }
        default: return ''
      }
    }
  },

  methods: {
    compiledMarkdown (text) {
      return marked(text)
    }
  }
}
</script>

<style lang="scss" scoped>
.transitional {
  transition: all .1s;
}
</style>
