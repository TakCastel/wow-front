<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      v-if="talent"
      :class="hover ? `${talentParams.color} lighten-1` : talentParams.color"
      :elevation="hover ? 12 : 2"
      class="mb-1 transitional"
    >
      <v-card-title class="subtitle-2 pa-2 text-uppercase">
        <v-icon left small>
          {{ talentParams.icon }}
        </v-icon>
        {{ talent.name }}
      </v-card-title>
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
        case 'active': return { icon: 'mdi-bullseye-arrow', color: 'primary' }
        case 'passive': return { icon: 'mdi-bullseye', color: 'secondary' }
        case 'reactive': return { icon: 'mdi-clock-in', color: 'alert' }
        case 'weakness': return { icon: 'mdi-shield-off', color: 'error' }
        case 'earned': return { icon: 'mdi-sack', color: 'success' }
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
