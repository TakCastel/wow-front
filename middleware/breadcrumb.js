export default ({ route, store }) => {
  // Take the last value (latest route child)
  const breadcrumb = route.meta.reduce((breadcrumb, meta) => meta.breadcrumb || breadcrumb, '')
  store.commit('SET_PAGE_BREADCRUMB', breadcrumb)
}
