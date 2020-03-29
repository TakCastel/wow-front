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
          <v-card-text v-if="article.body" v-html="compiledMarkdown(article.body)" class="article mt-5" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col cols="4">
      <v-skeleton-loader
        :loading="isLoading"
        type="image, article"
      >
        <v-card>
          <v-img
            :src="caption"
            class="white--text align-end"
            height="200px"
          />
          <v-card-title class="subtitle-2 pa-2">
            Légende
          </v-card-title>
          <v-card-text v-html="article.infobox" class="pa-2 pt-0" />
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
      return this.article.thumbnail ? this.article.thumbnail.url : ''
    },

    infobox () {
      return this.article.infobox
    }
  },

  mounted () {
    this.$store.dispatch('articles/requestArticleBySlug', this.$route.params.slug)
  },

  methods: {
    compiledMarkdown (text) {
      return marked(text)
    }
  }

}
</script>
