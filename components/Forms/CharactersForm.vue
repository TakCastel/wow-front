<template>
  <v-card>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-toolbar color="primary">
        <v-text-field
          v-model="content.name"
          :rules="nameRules"
          label="Nom du personnage"
          color="white"
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
            v-show="!valid && content.name === ''"
            border="left"
            color="grey darken-3"
            dark
          >
            N'oubliez pas de donner un nom à votre personnage ! ☝️
          </v-alert>
        </transition>

        <v-row>
          <v-col cols="12" md="8">
            <v-textarea
              v-model="content.description"
              :rules="descriptionRules"
              label="Racontez votre histoire..."
              rows="14"
              required
              filled
              rounded
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-file-input
              v-model="file"
              @change="handleFilePicked"
              prepend-icon="mdi-image-outline"
              label="Avatar"
              accept="image/*"
              hide-details
              filled
              rounded
            />
            <v-img
              :src="content.imageUrl"
              alt="Prévisualisation de l'image"
              class="my-3"
              max-height="200"
              contain
            />
            <v-textarea
              v-model="content.infobox"
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
            {{ editionMode ? 'Modifier' : 'Créer' }}
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
  props: {
    content: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        description: '',
        infobox: '',
        imageUrl: ''
      }),
      required: false
    },

    editionMode: {
      type: Boolean,
      defaut: false,
      required: false
    }
  },

  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || 'Il manque un titre à votre évènement'
    ],
    descriptionRules: [
      v => !!v || `Votre récit d'évènement est vide`
    ],
    file: null
  }),

  computed: {
    isLoading () {
      return this.$store.state.chara.loadingPublishCharacter
    }
  },

  methods: {
    handleSubmit () {
      if (this.$refs.form.validate()) {
        // Prepare the data to send whatever the method
        const data = {
          name: this.content.name,
          description: this.content.description,
          infobox: this.content.infobox
        }

        if (this.editionMode) {
        // If we are in edition mode, we need to provide the Id
          this.$store.dispatch('chara/editCharacter', {
            id: this.content.id,
            file: this.file,
            data
          }).then(() => this.$router.push({
            path: `/characters/${this.$route.query.slug}`
          }))
        } else {
        // Else, let's create the new character by giving correct category
          this.$store.dispatch('chara/addNewCharacter', {
            category: this.$route.query.category,
            file: this.file,
            data
          }).then(() => this.$router.push({
            name: 'characters'
          }))
        }
      }
    },

    handleFilePicked () {
      if (this.file) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.content.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(this.file)
      } else {
        this.content.imageUrl = ''
      }
    }
  }
}
</script>
