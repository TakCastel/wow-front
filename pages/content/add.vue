<template>
  <v-card>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-toolbar color="primary">
        <v-text-field
          v-model="title"
          :rules="titleRules"
          color="white"
          label="Titre de l'évènement"
          single-line
          hide-details
          dense
          filled
          rounded
        />
      </v-toolbar>
      <v-card-text class="grey darken-4">
        <v-row>
          <v-col cols="8">
            <v-textarea
              v-model="body"
              :rules="bodyRules"
              label="Racontez votre histoire..."
              rows="17"
              no-resize
              required
              filled
              rounded
            />
          </v-col>
          <v-col cols="4">
            <v-file-input
              v-model="files"
              @change="handleFilePicked"
              prepend-icon="mdi-image-outline"
              label="Illustration de couverture"
              accept="image/*"
              hide-details
              filled
              rounded
            />
            <v-img :src="imageUrl" alt="Prévisualisation de l'image" class="my-3" max-height="200" contain />
            <v-textarea
              v-model="infobox"
              prepend-icon="mdi-card-text"
              label="Légende"
              no-resize
              filled
              rounded
            />
          </v-col>
        </v-row>

        <v-btn
          :loading="isLoading"
          :disabled="!valid || isLoading"
          @click="handleSubmit"
          color="primary"
          large
        >
          Envoyer
        </v-btn>
      </v-card-text>
    </v-form>
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
    files: null,
    imageUrl: ''
  }),

  computed: {
    isLoading () {
      return this.$store.state.articles.loadingPublishArticle
    }
  },

  methods: {
    handleSubmit () {
      if (this.$refs.form.validate()) {
        const data = {
          title: this.title,
          body: this.body,
          infobox: this.infobox
        }

        this.$store.dispatch('articles/addNewArticle', {
          category: this.$route.query.category,
          file: this.files,
          data
        }).then(() => this.$router.push({ name: 'wiki' }))
      }
    },

    handleFilePicked () {
      if (this.files) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(this.files)
      } else {
        this.imageUrl = ''
      }
    }
  }
}
</script>
