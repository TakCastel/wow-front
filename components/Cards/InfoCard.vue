<template>
  <v-card :color="color">
    <v-card-text>
      <p class="body-1">
        <slot name="title" />
      </p>
      <span class="d-flex align-center justify-space-between display-1 white--text">
        <v-icon large class="mr-3">
          {{ icon }}
        </v-icon>
        <slot name="info" />
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
      required: false
    },
    icon: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
