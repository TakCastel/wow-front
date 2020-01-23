<template>
  <default-wrapper>
    <template v-slot:title>
      Règles de la Guilde
    </template>
    <template v-slot:text>
      Insérer les règles ici
    </template>
  </default-wrapper>
</template>

<script>
import DefaultWrapper from '@/components/Wrappers/DefaultWrapper'

export default {
  meta: {
    title: 'Règlement',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Règlement', active: true }
    ]
  },
  components: {
    DefaultWrapper
  }
}
</script>
