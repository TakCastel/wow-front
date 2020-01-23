<template>
  <v-col xs="6" sm="4" md="3" lg="2">
    <v-card>
      <v-img
        :src="content.img"
        :lazy-src="content.img"
        gradient="to top, rgba(86, 48, 40, 0.8) 1%, rgba(255, 255, 255, 0)"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <v-row>
          <v-col>
            <div class="title">
              {{ content.name }}
            </div>
          </v-col>
        </v-row>
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
        name: 'Sans nom',
        active: true,
        url: '/character/id',
        img: ''
      })
    }
  }
}
</script>
