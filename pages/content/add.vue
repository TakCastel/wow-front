<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Publication</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="grey darken-4">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="title"
                :counter="120"
                :rules="titleRules"
                label="Titre de l'évènement"
                required
                outlined
              />

              <v-textarea
                v-model="body"
                :rules="bodyRules"
                label="Racontez votre histoire..."
                rows="12"
                required
                outlined
              />
            </v-col>
            <v-col>
              <v-file-input
                v-model="file"
                prepend-icon="mdi-image-outline"
                label="Illustration de couverture"
                outlined
              />
              <v-textarea
                v-model="infobox"
                prepend-icon="mdi-card-text"
                label="Légende"
                outlined
              />
            </v-col>
          </v-row>
        </v-container>

        <v-btn
          :loading="isLoading"
          :disabled="!valid || isLoading"
          @click="handleSubmit"
          color="primary"
          large
          class="mt-3"
        >
          Envoyer
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'NewArticle',

  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', url: '/wiki' },
      { title: 'Nouvel article', active: true }
    ]
  },

  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Un titre doit être renseigné',
      v => (v && v.length <= 120) || 'Le titre ne doit pas dépasser 120 caractères'
    ],
    body: '',
    bodyRules: [
      v => !!v || 'Votre article est vide'
    ],
    infobox: '',
    file: null
  }),

  computed: {
    isLoading () {
      return this.$store.state.articles.loadingPublishArticle
    }
  },

  methods: {
    handleSubmit () {
      if (this.$refs.form.validate()) {
        const payload = {
          title: this.title,
          body: this.body,
          category: this.$route.query.category,
          infobox: this.infobox,
          thumbnail: this.file
        }

        this.$store.dispatch('articles/addNewArticle', payload)
      }
    }
  }
}
</script>
