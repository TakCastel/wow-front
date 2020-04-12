<template>
  <v-snackbar v-model="isActive" :color="color" right vertical>
    {{ message }}
    <v-btn @click="isActive = false" text outlined>
      Fermer
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Notifications',

  data: () => ({
    message: null,
    isActive: false
  }),

  computed: {
    ...mapState({
      history: state => state.notifs.notificationHistory,
      color: state => state.notifs.color
    })
  },

  watch: {
    async isActive (status) {
      if (status || !this.history.length) { return }
      await this.$nextTick()
      setTimeout(() => {
        this.shiftMessage()
      }, 500)
    },

    history () {
      if (!this.isActive) {
        this.shiftMessage()
      }
    }
  },

  methods: {
    shiftMessage () {
      const newMessage = this.history[0]
      this.message = newMessage
      this.isActive = true
      this.$store.commit('notifs/QUEUED_EVENT')
    }
  }
}
</script>
