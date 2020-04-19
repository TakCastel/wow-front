<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dense class="primary">
        <v-toolbar-title>
          Confirmation
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        Vous êtes sur le point de supprimer un article, êtes-vous sûr de vouloir effectuer cette action ?
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialog = false" color="primary" text>
          Annuler
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="loading"
          @click="handleDelete"
          color="error"
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    model: {
      type: String,
      default: 'articles',
      required: true
    },
    id: {
      type: String,
      default: '',
      required: true
    }
  },

  data: () => ({
    dialog: false,
    loading: false
  }),

  methods: {
    async handleDelete () {
      this.loading = true
      await this.$axios.put(`/${this.model}/${this.id}`, {
        active: false
      })
        .then((response) => { this.$router.back() })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
      this.dialog = false
      this.loading = false
    }
  }
}
</script>
