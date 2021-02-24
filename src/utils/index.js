export const testUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  return regex.test(url)
}

export const testSlug = (slug) => {
  if (slug.length < 4) return false
  // eslint-disable-next-line no-useless-escape
  const regex = /[^a-zA-Z0-9_-]/g
  return !regex.test(slug)
}