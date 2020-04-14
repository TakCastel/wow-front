<template>
  <v-app dark>
    <NavigationDrawer />
    <v-app-bar
      :src="require('../assets/images/wallpapers/ESO_Morrowind_keyart.jpg')"
      color="#563028"
      fade-img-on-scroll
      shrink-on-scroll
      clipped-left
      prominent
      fixed
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(86, 48, 40, 0.8), rgba(128, 208, 199, .2)"
        />
      </template>
      <v-app-bar-nav-icon @click.stop="handleDrawer" />
      <v-toolbar-title class="pl-3">
        <h1 class="title">
          {{ appTitle }}
          <span class="subtitle-1 hidden-sm-and-down">
            - {{ $store.state.pageTitle }}
          </span>
        </h1>
      </v-toolbar-title>
      <v-spacer />
      <side-menu v-if="isAuthenticated" />
      <v-btn v-else @click="handleLogin" icon>
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
      <!-- <template v-slot:extension>
        <v-tabs
          align-with-title
          background-color="transparent"
        >
          <v-tab>Site web</v-tab>
          <v-tab>Infos légales</v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <v-layout column>
          <Breadcrumb />
          <nuxt />
          <Notifications />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import Breadcrumb from './components/Breadcrumb'
import SideMenu from './components/SideMenu'
import Notifications from './components/Notifications'
import NavigationDrawer from './components/NavigationDrawer'

export default {
  name: 'MainLayout',

  components: {
    Breadcrumb,
    SideMenu,
    NavigationDrawer,
    Notifications
  },

  data: () => ({
    appTitle: 'The Elder Scrolls'
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.session.user
    })
  },

  methods: {
    handleDrawer () {
      this.$store.commit('TOGGLE_IS_DRAWER_OPEN', !this.$store.state.isDrawerOpen)
    },

    handleLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
