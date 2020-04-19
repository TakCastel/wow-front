<template>
  <div>
    <ArticlesForm
      v-if="this.$route.query.model === 'articles'"
      :edition-mode="true"
      :content="{
        id: content.id,
        title: content.title,
        body: content.body,
        imageUrl: imageUrl,
        infobox: content.infobox
      }"
    />
    <CharactersForm
      v-if="this.$route.query.model === 'characters'"
      :edition-mode="true"
      :content="{
        id: content.id,
        name: content.name,
        description: content.description,
        imageUrl: imageUrl,
        infobox: content.infobox
      }"
    />
  </div>
</template>

<script>
import ArticlesForm from '@/components/Forms/ArticlesForm'
import CharactersForm from '@/components/Forms/CharactersForm'

export default {
  validate ({ params }) {
    return true
  },

  name: 'EditArticle',

  components: {
    ArticlesForm,
    CharactersForm
  },

  data: () => ({
    model: undefined
  }),

  computed: {
    content () {
      if (this.$route.query.model === 'articles') {
        return this.$store.state.articles.currentArticle
      } else if (this.$route.query.model === 'characters') {
        return this.$store.state.chara.currentCharacter
      } else {
        return undefined
      }
    },

    imageUrl () {
      if (this.content.thumbnail) {
        return this.content.thumbnail.url
      } else if (this.content.avatar) {
        return this.content.avatar.url
      } else {
        return ''
      }
    }
  },

  mounted () {
    // If the user comes in the edition from an external link
    // We need to request the correct content to edit
    if (this.$route.query.model === 'articles') {
      const loadedArticleSlug = this.$store.state.articles.currentArticle.slug
      if (this.$route.query.slug !== loadedArticleSlug) {
        this.$store.dispatch('articles/requestArticleBySlug', this.$route.query.slug)
      }
    } else if (this.$route.query.model === 'characters') {
      const loadedCharacterSlug = this.$store.state.chara.currentCharacter.slug
      if (this.$route.query.slug !== loadedCharacterSlug) {
        this.$store.dispatch('chara/requestCharacterBySlug', this.$route.query.slug)
      }
    } else {
      this.$router.push('/')
    }
  },

  middleware: ['protected'],

  meta: {
    title: 'Trames',
    breadcrumb: [
      { title: 'Accueil', url: '/' },
      { title: 'Trames', url: '/wiki' },
      { title: 'Édition', active: true }
    ]
  }
}
</script>
