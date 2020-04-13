export const state = () => ({
  loadingEventArticles: false,
  listOfArticles: [],
  loadingCurrentArticle: false,
  currentArticle: {}
})

export const actions = {
/**
 * Request all event listed
 * @param {*} param0
 */
  requestAllArticles ({ commit }) {
    commit('SET_EVENT_ARTICLES_LOADING', true)
    this.$axios
      .get('/articles', {
        params: {
          _sort: 'created_At:desc',
          'game.title': 'wow'
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
   * @param {*} param0
   * @param {*} slug
   */
  requestArticleBySlug ({ commit }, slug) {
    commit('SET_CURRENT_ARTICLE_LOADING', true)
    commit('SET_CURRENT_ARTICLE', {})
    this.$axios
      .get('/articles', {
        params: {
          slug,
          'game.title': 'wow'
        }
      })
      .then((response) => {
        commit('SET_CURRENT_ARTICLE', response.data)
        commit('SET_CURRENT_ARTICLE_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  SET_ARTICLES (state, response) {
    state.listOfArticles = response
  },

  SET_CURRENT_ARTICLE (state, response) {
    state.currentArticle = { ...response[0] }
  },

  SET_CURRENT_ARTICLE_LOADING (state, status) {
    state.loadingCurrentArticle = status
  },

  SET_EVENT_ARTICLES_LOADING (state, status) {
    state.loadingCurrentArticle = status
  }
}
