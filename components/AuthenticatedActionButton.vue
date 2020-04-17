<template>
  <v-tooltip :disabled="isAuthenticated" top color="grey darken-3" max-width="250">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn
          :disabled="!isAuthenticated"
          @click="handleClick"
          v-bind="{...variant}"
        >
          <v-icon left>
            {{ icon }}
          </v-icon>
          {{ text }}
        </v-btn>
      </div>
    </template>
    <span>Vous devez vous connecter pour réaliser cette action</span>
  </v-tooltip>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: 'Nouveau',
      required: false
    },
    icon: {
      type: String,
      default: 'mdi-plus-circle-outline',
      required: false
    },
    variant: {
      type: Object,
      default: () => ({
        outlined: false
      }),
      required: false
    }
  },

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },

  methods: {
    handleClick () {
      this.$emit('action')
    }
  }
}
</script>
