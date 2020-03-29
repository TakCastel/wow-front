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
        @click=""
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
export default {
  data: () => ({
    items: [
      { title: 'Paramètres', icon: 'mdi-cog' },
      { title: 'Profil', icon: 'mdi-account' },
      { title: 'Portail', icon: 'mdi-view-dashboard' },
      { title: 'Déconnexion', icon: 'mdi-logout-variant' }
    ]
  })
}
</script>
