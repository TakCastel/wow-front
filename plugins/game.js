export default (ctx, inject) => {
  if (process.env.NODE_ENV === 'production') {
    if (process.client) {
      const splitDomain = window.location.host.split('.')
      const subdomain = splitDomain[0]
      inject('game', {
        subdomain
      })
    }
  } else {
    inject('game', 'teso')
  }
}
