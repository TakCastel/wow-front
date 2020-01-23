<template>
  <v-timeline align-top>
    <v-timeline-item
      v-for="event in orderedEvents"
      :key="event.id"
      :icon="event.icon"
      :color="event.color"
      fill-dot
    >
      <template v-slot:opposite>
        <span>Mois et année de l'évènement</span>
      </template>
      <v-card color="to top right, rgba(86, 48, 40, 0.8), rgba(128, 208, 199, .2)" dark>
        <v-toolbar dense class="title">
          {{ event.name }}
        </v-toolbar>
        <v-card-text class="grey darken-4 white--text pa-3">
          <p>
            {{ event.submary }}
          </p>
          <v-btn outlined>
            Lire l'article
          </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  meta: {
    title: 'Chronologie',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Chronologie', active: true }
    ]
  },
  data: () => ({
    timeline: [
      {
        id: 1,
        name: 'Bataille du Cairn',
        submary: 'La bataille du Cairn des âmes',
        icon: 'mdi-home',
        color: 'primary',
        order: 2
      },
      {
        id: 2,
        name: 'Taverne',
        submary: 'On va dans la taverne',
        icon: 'mdi-glass-mug-variant',
        color: 'secondary',
        order: 3
      },
      {
        id: 3,
        name: 'Rencontre',
        submary: 'Ils se rencontrent',
        icon: 'mdi-home',
        color: 'primary',
        order: 1
      }
    ]
  }),

  computed: {
    orderedEvents () {
      const elements = this.timeline
      return elements.sort((a, b) => b.order - a.order)
    }
  }
}
</script>
