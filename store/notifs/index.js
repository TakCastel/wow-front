export const state = () => ({
  notificationHistory: [

  ],
  color: 'success'
})

export const actions = {
  newEventOccurs ({ commit }, message) {
    console.log(message)
    const newEvent = message
    commit('INSERT_NEW_EVENT', newEvent)
  }
}

export const mutations = {
  INSERT_NEW_EVENT (state, newEvent) {
    return state.notificationHistory.push(newEvent)
  },

  QUEUED_EVENT (state) {
    return state.notificationHistory.shift()
  }
}
