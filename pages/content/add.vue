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
        <transition name="fade">
          <v-alert
            v-show="!valid && title === ''"
            border="left"
            color="error"
            dark
          >
            Il manque un titre à votre évènement
          </v-alert>
        </transition>
        <v-alert
          border="left"
          color="grey darken-3"
          dark
        >
          Vous êtes sur le point de publier un article dans la version alpha du wiki de guilde. Des erreurs peuvent survenir, pensez à garder un exemplaire de votre article quelque part ailleurs que sur cette interface.
        </v-alert>

        <v-row>
          <v-col cols="12" md="8">
            <v-textarea
              v-model="body"
              :rules="bodyRules"
              label="Racontez votre histoire..."
              rows="14"
              required
              filled
              rounded
            />
          </v-col>
          <v-col cols="12" md="4">
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
              hide-details

              no-resize
              filled
              rounded
            />
          </v-col>
        </v-row>

        <v-row class="px-3">
          <v-btn
            :loading="isLoading"
            :disabled="!valid || isLoading"
            @click="handleSubmit"
            color="primary"
            rounded
            large
          >
            Envoyer
            <v-icon right>
              mdi-send
            </v-icon>
          </v-btn>
        </v-row>
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
      v => !!v || 'Il manque un titre à votre évènement'
    ],
    body: '',
    bodyRules: [
      v => !!v || `Votre récit d'évènement est vide`
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

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
