export const getUrlForDocumentType = (type: string, slug?: string) => {
  if (!slug) {
    return '/'
  }

  switch (type) {
    case 'article':
      return `/articles/${slug}`
    case 'section':
      return `/sections/${slug}`
    case 'person':
      return `/authors/${slug}`
    default:
      return '/'
  }
}
