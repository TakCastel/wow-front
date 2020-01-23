const mutations = {
  TOGGLE_IS_DRAWER_OPEN (state, status) {
    state.isDrawerOpen = status
  },
  SET_PAGE_TITLE (state, title) {
    state.pageTitle = title
  },
  SET_PAGE_BREADCRUMB (state, breadcrumb) {
    state.pageBreadcrumb = breadcrumb
  }
}

export default mutations
