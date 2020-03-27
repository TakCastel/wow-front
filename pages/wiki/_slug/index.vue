<template>
  <v-row>
    <v-col cols="8">
      <v-skeleton-loader
        :loading="isLoading"
        transition="fade-transition"
        type="article"
      >
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>{{ article.title }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="article.body" v-html="compiledMarkdown" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col cols="4">
      <v-card />
    </v-col>
  </v-row>
</template>

<script>
import marked from 'marked'

export default {
  validate ({ params }) {
    return true
  },
  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', url: '/wiki' },
      { title: 'Article', active: true }
    ]
  },

  computed: {
    article () {
      return this.$store.state.articles.currentArticle
    },

    isLoading () {
      return this.$store.state.articles.loadingCurrentArticle
    },

    compiledMarkdown () {
      return marked(this.article.body)
    }
  },

  mounted () {
    this.$store.dispatch('articles/requestArticleBySlug', this.$route.params.slug)
  }

}
</script>
