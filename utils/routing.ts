export const getUrlForDocumentType = (
  type: string,
  slug?: string,
  brand?: string
): `/${string}` | `${string}/${string}/${string}` => {
  if (!slug) {
    return `/${brand ?? 'tech'}`
  }

  switch (type) {
    case 'article':
      return `/${brand ?? 'tech'}/articles/${slug}`
    case 'section':
      return `/${brand ?? 'tech'}/sections/${slug}`
    case 'person':
      return `/${brand ?? 'tech'}/authors/${slug}`
    default:
      return `/${brand ?? 'tech'}`
  }
}
