export const getUrlForDocumentType = (type: string, slug?: string) => {
  if (!slug) {
    return '/'
  }

  switch (type) {
    case 'article':
      return `/article/${slug}`
    case 'section':
      return `/section/${slug}`
    case 'person':
      return `/author/${slug}`
    default:
      return '/'
  }
}
