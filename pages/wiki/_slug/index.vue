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
          <v-card-text v-if="article.infobox" v-html="compiledMarkdown(article.infobox)" class="text--primary" />
          <v-card-text v-else>
            {{ article.title }}
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
      return this.article.thumbnail ? this.article.thumbnail.url : ''
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

<style>
.article h1 {
  margin-bottom: 8px;
  font-size: 1.4em;
  position: relative;
}
.article h2 {
  margin-bottom: 8px;
  font-size: 1.2em;
  position: relative;
}
</style>
