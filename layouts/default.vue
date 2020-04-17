<template>
  <v-app dark>
    <NavigationDrawer />
    <v-app-bar
      :src="theme ? theme.cover.url : undefined"
      color="primary darken-1"
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
          gradient="to top, rgba(31, 31, 31, .8) 25%, rgba(48, 48, 48, .2)"
        />
      </template>
      <v-app-bar-nav-icon @click.stop="handleDrawer" />
      <v-toolbar-title class="pl-3">
        <h1 class="title">
          {{ appTitle ? appTitle : '...' }}
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
    theme: ''
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.session.user
    }),

    appTitle () {
      return this.theme.title
    },

    // tmp fix befaore putting this in plugin
    domainTarget () {
      return this.$game
    }
  },

  beforeCreate () {
    this.$axios
      .get('/themes', {
        params: {
          'game.title': this.$game
        }
      })
      .then((response) => {
        this.theme = response.data[0]
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
