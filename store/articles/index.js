import pkg from '@/package.json'

export const state = () => ({
  loadingPublishArticle: false, // Used for loading state on publish button
  loadingEventArticles: false, // Used to display a loader before showing articles
  loadingCurrentArticle: false, // Used to display a loading state inside an article
  listOfArticles: [], // Display all articles within all categories
  currentArticle: {} // Display the current article of the page
})

export const actions = {
/**
 * Request all articles
 */
  requestAllArticles ({ commit }) {
    commit('SET_EVENT_ARTICLES_LOADING', true)
    this.$axios
      .get('/articles', {
        params: {
          _sort: 'created_At:desc',
          'game.title': pkg.targetDomain
        }
      })
      .then((response) => {
        commit('SET_ARTICLES', response.data)
        commit('SET_EVENT_ARTICLES_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Request the current reading article
   * @param {*} slug
   */
  requestArticleBySlug ({ commit }, slug) {
    commit('SET_CURRENT_ARTICLE_LOADING', true)
    commit('SET_CURRENT_ARTICLE', {})
    this.$axios
      .get('/articles', {
        params: {
          slug,
          'game.title': pkg.targetDomain
        }
      })
      .then((response) => {
        commit('SET_CURRENT_ARTICLE', response.data)
        commit('SET_CURRENT_ARTICLE_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   *
   * @param {payload.title} payload title of the article
   * @param {payload.body} payload body of the article
   * @param {payload.category} payload type of te article
   * @param {payload.thumbnail} payload thumbnail of te article
   */
  async addNewArticle ({ commit, state }, payload) {
    commit('SET_PUBLICATION_LOADING', true)
    try {
      const formData = new FormData()
      // Get the category Id to post in the correct category
      const category = await this.$axios.get('/categories', { params: { name: payload.category } })
      // Get the game Id to post in the correct game
      const game = await this.$axios.get('/games', { params: { title: pkg.targetDomain } })

      // Create the new article to push
      const article = {
        ...payload.data,
        category: category.data[0].id,
        game: game.data[0].id
      }

      formData.append('data', JSON.stringify(article))
      formData.append('files.thumbnail', payload.file)

      // Axios /POST article method
      this.$axios.post('/articles', formData)
      // console.log(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      commit('SET_PUBLICATION_LOADING', false)
    }
  }
}

export const mutations = {
  SET_ARTICLES (state, response) {
    state.listOfArticles = response
  },

  SET_CURRENT_ARTICLE (state, response) {
    state.currentArticle = { ...response[0] }
  },

  SET_PUBLICATION_LOADING (state, status) {
    state.loadingPublishArticle = status
  },

  SET_CURRENT_ARTICLE_LOADING (state, status) {
    state.loadingCurrentArticle = status
  },

  SET_EVENT_ARTICLES_LOADING (state, status) {
    state.loadingCurrentArticle = status
  }
}
