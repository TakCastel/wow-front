<template>
  <div>
    <ArticlesForm v-if="this.$route.query.model === 'articles'" />
    <CharactersForm v-if="this.$route.query.model === 'characters'" />
  </div>
</template>

<script>
import ArticlesForm from '@/components/Forms/ArticlesForm'
import CharactersForm from '@/components/Forms/CharactersForm'

export default {
  validate ({ params }) {
    return true
  },

  name: 'NewArticle',

  middleware: ['protected'],

  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', url: '/wiki' },
      { title: 'Nouvel article', active: true }
    ]
  },

  components: {
    ArticlesForm,
    CharactersForm
  }
}
</script>
