<template>
  <v-menu
    min-width="250"
    bottom
    left
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="handleActions(item.action)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SideMenu',

  data: () => ({
    items: [
      { title: 'Paramètres', icon: 'mdi-cog', action: 'settings' },
      { title: 'Profil', icon: 'mdi-account', action: 'profile' },
      { title: 'Portail', icon: 'mdi-view-dashboard', action: 'portal' },
      { title: 'Déconnexion', icon: 'mdi-logout-variant', action: 'logout' }
    ]
  }),

  methods: {
    ...mapActions({
      logout: 'auth/disconnectUser'
    }),

    /**
     * When user click on menu item, redirect to any route
     */
    handleActions (action) {
      switch (action) {
        case 'logout':
          this.logout()
          break
        case 'settings':
          alert(`Cette option n'est pas supportée par la version alpha`)
          break
        case 'profile':
          alert(`Cette option n'est pas supportée par la version alpha`)
          break
        case 'portal':
          alert(`Cette option n'est pas supportée par la version alpha`)
      }
    }
  }

}
</script>
