export const state = () => ({
  loadingAllCharacters: false,
  listOfCharacters: [],
  loadingCurrentCharacter: false,
  currentCharacter: {}
})

export const actions = {
  /**
   * Request all characters
   * @param {*} param0
   */
  requestAllCharacters ({ commit }) {
    commit('SET_CHAR_LIST_LOADING', true)
    this.$axios
      .get('/characters', {
        params: {
          _sort: 'created_At:desc',
          'game.title': 'wow'
        }
      })
      .then((response) => {
        commit('SET_CHAR', response.data)
        commit('SET_CHAR_LIST_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  /**
   * Request the current character
   * @param {*} param0
   * @param {*} slug
   */
  requestCharacterBySlug ({ commit }, slug) {
    commit('SET_CURRENT_CHAR_LOADING', true)
    commit('SET_CURRENT_CHAR', {})
    this.$axios
      .get('/characters', {
        params: {
          slug,
          'game.title': 'wow'
        }
      })
      .then((response) => {
        commit('SET_CURRENT_CHAR', response.data)
        commit('SET_CURRENT_CHAR_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }
}

export const mutations = {
  SET_CHAR_LIST_LOADING (state, status) {
    state.loadingAllCharacters = status
  },

  SET_CHAR (state, response) {
    state.listOfCharacters = response
  },

  SET_CURRENT_CHAR_LOADING (state, status) {
    state.loadingCurrentCharacter = status
  },

  SET_CURRENT_CHAR (state, response) {
    state.currentCharacter = response[0]
  }

}
