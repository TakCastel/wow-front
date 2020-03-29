<template>
  <v-card v-if="talent" :color="talentParams.color" class="mb-1">
    <v-card-title class="subtitle-2 pa-2">
      <v-icon left small>
        {{ talentParams.icon }}
      </v-icon>
      {{ talent.name }}
    </v-card-title>
    <v-card-text v-html="talent.description" class="pa-2 pt-0" />
  </v-card>
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
