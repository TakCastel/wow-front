<template>
  <v-row>
    <v-col
      :order="$vuetify.breakpoint.xsOnly ? 3 : 1"
      cols="12"
      sm="8"
    >
      <v-skeleton-loader
        :loading="isLoading"
        height="300px"
        type="article"
      >
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title>
              {{ article.title }}
            </v-toolbar-title>
            <v-spacer />
            <v-btn v-if="isAuthenticated" @click="handleEdit" icon>
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <ConfirmDeletionModale v-if="isAuthenticated" :id="article.id" model="articles" />
          </v-toolbar>
          <v-card-text v-if="article.body" v-html="compiledMarkdown(article.body)" class="article mt-5 white--text" />
        </v-card>
      </v-skeleton-loader>
    </v-col>

    <v-col cols="12" sm="4" order="2">
      <v-skeleton-loader
        :loading="isLoading"
        type="image, article"
      >
        <v-card>
          <v-img :src="caption" />
          <v-card-text v-html="article.infobox" class="white--text pa-3" />
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import marked from 'marked'
import ConfirmDeletionModale from '@/components/Actions/ConfirmDeletionModale'

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

  components: {
    ConfirmDeletionModale
  },

  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },

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

  beforeMount () {
    this.$store.dispatch('articles/requestArticleBySlug', this.$route.params.slug)
  },

  methods: {
    compiledMarkdown (text) {
      return marked(text)
    },

    handleEdit () {
      this.$router.push({
        path: '/content/edit',
        query: {
          model: 'articles',
          slug: this.$route.params.slug
        }
      })
    }
  }

}
</script>
