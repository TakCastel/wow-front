export default ({ route, store }) => {
  // Take the last value (latest route child)
  const title = route.meta.reduce((title, meta) => meta.title || title, '')
  store.commit('SET_PAGE_TITLE', title)
}
