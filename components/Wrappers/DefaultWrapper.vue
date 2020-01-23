<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>
        <slot name="title" />
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="white--text">
      <slot name="text" />
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>
