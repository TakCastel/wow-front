<template>
  <v-row>
    <v-col cols="8">
      <v-skeleton-loader
        :loading="isLoading"
        height="300px"
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
      <v-skeleton-loader
        :loading="isLoading"
        height="300px"
        type="card-avatar, article, actions"
      >
        <v-card>
          <v-img
            :src="caption"
            class="white--text align-end"
            height="200px"
          />
          <v-card-subtitle class="pb-0">
            Description de l'image
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>Liste de choses</div>
            <div>Elements</div>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
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

    caption () {
      return this.article.Caption ? this.article.Caption.url : ''
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
