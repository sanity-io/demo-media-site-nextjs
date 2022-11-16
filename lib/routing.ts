export const getUrlForDocumentType = (type, slug) => {
  switch (type) {
    case 'article':
      return `/article/${slug}`
    case 'section':
      return `/section/${slug}`
    default:
      return '/'
  }
}