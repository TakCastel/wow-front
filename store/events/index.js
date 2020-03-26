import {
  SET_EVENTS
} from './mutation-types'

export const state = () => ({
  articles: []
})

export const actions = {
/**
 * Request all event listed
 * @param {*} param0
 */
  requestAllEvents ({ commit }) {
    this.$axios
      .get('/events', {
        params: {
          _sort: 'created_At:desc'
        }
      })
      .then((response) => {
        commit('SET_EVENTS', response)
      })
      .catch((error) => {
        alert('An error occurred:', error)
      })
  }
}

export const mutations = {
  [SET_EVENTS] (state, response) {
    state.articles = response.data
  }
}
