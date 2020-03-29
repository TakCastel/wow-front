<template>
  <v-dialog v-model="isOpen" :persistent="router" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="400px">
    <v-card tile>
      <v-card-title class="pa-2 grey darken-4">
        <v-btn v-if="router" @click="handleGoBack" icon>
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-btn v-else @click="isOpen=false" icon>
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <slot name="header" />
      </v-card-title>
      <v-card-text class="grow">
        <slot />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    router: {
      type: Boolean,
      default: true,
      required: false
    }
  },

  computed: {
    isOpen: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    /**
     * When the user click on go back button,
     * it goes to previous router view
     */
    handleGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>
