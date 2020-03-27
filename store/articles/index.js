export const state = () => ({
  articlesByCategories: [],
  loadingCurrentArticle: false,
  currentArticle: {}
})

export const actions = {
/**
 * Request all event listed
 * @param {*} param0
 */
  requestAllArticles ({ commit }) {
    this.$axios
      .get('/categories', {
        params: {
          _sort: 'created_At:desc'
        }
      })
      .then((response) => {
        commit('SET_ARTICLES', response.data)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Request the current reading article
   * @param {*} param0
   * @param {*} id
   */
  requestArticleBySlug ({ commit }, slug) {
    commit('SET_CURRENT_ARTICLE_LOADING', true)
    commit('SET_CURRENT_ARTICLE', {})
    this.$axios
      .get('/articles', {
        params: {
          slug
        }
      })
      .then((response) => {
        console.log(response.data)
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
    state.articlesByCategories = response
  },

  SET_CURRENT_ARTICLE (state, response) {
    state.currentArticle = { ...response[0] }
  },

  SET_CURRENT_ARTICLE_LOADING (state, status) {
    state.loadingCurrentArticle = status
  }
}
