<template>
  <WrapperDefault>
    <template v-slot:title>
      Règles de la Guilde
    </template>
    <template v-slot:text>
      Insérer les règles ici
    </template>
  </WrapperDefault>
</template>

<script>
import WrapperDefault from '@/components/Wrappers/WrapperDefault'

export default {
  meta: {
    title: 'Règlement',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Règlement', active: true }
    ]
  },
  components: {
    WrapperDefault
  }
}
</script>
