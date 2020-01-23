<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Titre de la page</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          Texte
        </v-col>
        <v-col cols="4">
          Caption
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  validate ({ params }) {
    return true
  },

  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', url: '/wiki' },
      { title: 'Article', active: true }
    ]
  }
}
</script>
