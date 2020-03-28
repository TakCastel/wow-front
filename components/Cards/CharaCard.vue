<template>
  <v-col xs="6" sm="4" md="3" lg="2">
    <v-card @click="handleClick" class="mx-auto">
      <v-img
        :src="caption"
        :lazy-src="caption"
        gradient="to top, rgba(86, 48, 40, 0.99) 10%, rgba(255, 255, 255, 0)"
        aspect-ratio="1"
        class="grey white--text align-end"
      >
        <v-card-title v-text="content.name" class="subtitle-2" />
      </v-img>
      <v-card-actions>
        <v-btn @click="handleClick" small outlined>
          Fiche
        </v-btn>
      </v-card-actions>
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
  },

  computed: {
    caption () {
      return this.content.avatar ? this.content.avatar.url : ''
    }
  },

  methods: {
    handleClick () {
      this.$router.push({ path: `/characters/${this.content.slug}` })
    }
  }
}
</script>
