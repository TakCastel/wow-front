<template>
  <v-col xs="12" sm="6" md="4">
    <v-card>
      <v-img
        :src="caption"
        :lazy-src="caption"
        gradient="to top right, rgba(86, 48, 40, 0.8), rgba(128, 208, 199, .2)"
        aspect-ratio="1.6"
        class="grey lighten-2"
      >
        <div class="d-flex fill-height flex-column justify-space-between pa-3">
          <div>
            <div class="title">
              {{ content.title }}
            </div>
            <div class="body-1">
              {{ content.active ? 'En cours' : 'Terminée' }}
            </div>
          </div>
          <div class="d-flex justify-space-between align-center">
            <v-btn @click="handleClick" outlined>
              Lire
            </v-btn>
            <v-tooltip color="grey darken-4" left>
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <v-icon>
                    mdi-script-text
                  </v-icon>
                  0
                </div>
              </template>
              <span>Rapports de mission</span>
            </v-tooltip>
          </div>
        </div>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        id: undefined,
        title: 'Sans titre',
        body: 'text',
        slug: 'sans-titre',
        img: ''
      })
    }
  },

  computed: {
    caption () {
      return this.content.thumbnail ? this.content.thumbnail.url : ''
    }
  },

  methods: {
    handleClick () {
      this.$router.push({ path: `/wiki/${this.content.slug}` })
    }
  }
}
</script>
