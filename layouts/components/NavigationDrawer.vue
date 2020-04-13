<template>
  <v-navigation-drawer
    v-model="isDrawerOpen"
    :bottom="$vuetify.breakpoint.xsOnly"
    color="#202020"
    clipped
    fixed
    app
  >
    <v-list>
      <!-- MAIN NAVIGATION -->
      <v-list-item
        v-for="mainPage in mainNavigation"
        :key="mainPage.title"
        :to="mainPage.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon color="grey">
            {{ mainPage.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ mainPage.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- SECONDARY NAVIGATION -->
      <v-subheader>Encyclopédie</v-subheader>
      <template v-for="subPage in subNavigation">
        <!-- If has multiple items -->
        <v-list-group
          v-if="subPage.items"
          v-model="subPage.active"
          :key="subPage.title"
          no-action
        >
          <v-icon slot="prependIcon" color="grey">
            {{ subPage.icon }}
          </v-icon>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="subPage.title" />
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(page, index) in subPage.items"
            :key="index"
            :to="page.to"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ page.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- If has no items -->
        <v-list-item v-else :key="subPage.title" :to="subPage.to">
          <v-list-item-action>
            <v-icon color="grey">
              {{ subPage.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ subPage.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import drawerItems from './NavigationDrawerItems'

export default {
  name: 'NavigationDrawer',

  computed: {
    mainNavigation () {
      return drawerItems.mainNavigation
    },
    subNavigation () {
      return drawerItems.subNavigation
    },
    isDrawerOpen: {
      get () {
        return this.$store.state.isDrawerOpen
      },
      set (value) {
        this.$store.commit('TOGGLE_IS_DRAWER_OPEN', value)
      }
    }
  }
}
</script>
