import pkg from '@/package.json'

export const state = () => ({
  loadingPublishCharacter: false,
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
          'game.title': pkg.targetDomain
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
          'game.title': pkg.targetDomain
        }
      })
      .then((response) => {
        commit('SET_CURRENT_CHAR', response.data)
        commit('SET_CURRENT_CHAR_LOADING', false)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  },

  async addNewCharacter ({ commit, dispatch }, payload) {
    commit('SET_PUBLICATION_LOADING', true)
    try {
      // Get the game Id to post in the correct game
      const game = await this.$axios.get('/games', { params: { title: pkg.targetDomain } })

      // Create the new article to push
      const character = {
        ...payload.data,
        game: game.data[0].id
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify(character))
      if (payload.file) { formData.append(`files.avatar`, payload.file) }

      // Axios /POST article method
      await this.$axios.post(`/characters/`, formData)

      dispatch(
        'notifs/newEventOccurs',
        'Félicitations ! Votre personnage bien été ajouté à la liste des membres de la Guilde.',
        { root: true }
      )
    } catch (err) {
      console.error(err)
    } finally {
      commit('SET_PUBLICATION_LOADING', false)
    }
  },

  async editCharacter ({ commit, dispatch }, payload) {
    commit('SET_PUBLICATION_LOADING', true)
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(payload.data))
      if (payload.file) { formData.append(`files.avatar`, payload.file) }

      await this.$axios.put(`/characters/${payload.id}`, formData)

      dispatch(
        'notifs/newEventOccurs',
        'Votre personnage a bien été modifié.',
        { root: true }
      )
    } catch (err) {
      console.error(err)
    } finally {
      commit('SET_PUBLICATION_LOADING', false)
    }
  }
}

export const mutations = {
  SET_CHAR_LIST_LOADING (state, status) {
    state.loadingAllCharacters = status
  },

  SET_CHAR (state, response) {
    state.listOfCharacters = response
  },

  SET_PUBLICATION_LOADING (state, status) {
    state.loadingPublishCharacter = status
  },

  SET_CURRENT_CHAR_LOADING (state, status) {
    state.loadingCurrentCharacter = status
  },

  SET_CURRENT_CHAR (state, response) {
    state.currentCharacter = response[0]
  }

}
