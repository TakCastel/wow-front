<template>
  <v-col xs="12" sm="6" md="4">
    <v-card>
      <v-img
        :src="content.img"
        :lazy-src="content.img"
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
          <div>
            <v-btn :to="content.url" outlined>
              Voir
            </v-btn>
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
        title: 'Sans titre',
        active: true,
        url: '/wiki/id',
        img: ''
      })
    }
  }
}
</script>
