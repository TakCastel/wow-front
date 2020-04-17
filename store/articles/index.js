import pkg from '@/package.json'

export const state = () => ({
  loadingPublishArticle: false,
  idOfNewArticleCategory: '',
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
   */
  async addNewArticle ({ commit, state }, payload) {
    commit('SET_PUBLICATION_LOADING', true)
    try {
      await console.log('meh')
      // const category = await this.$axios.get('/categories', {
      //   params: {
      //     name: payload.category
      //   }
      // })

      // const game = await this.$axios.get('/games', {
      //   params: {
      //     title: pkg.targetDomain
      //   }
      // })

      // this.$axios.post('/articles', {
      //   active: true,
      //   title: payload.title,
      //   body: payload.body,
      //   infobox: payload.infobox,
      //   thumbnail: payload.thumbnail,
      //   category: category.data[0].id,
      //   game: game.data[0].id
      // })
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
