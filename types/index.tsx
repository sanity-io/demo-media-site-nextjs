export interface AuthorProps {
  name: string
  slug?: string
  image: any
  bio: any
  role: string
  articles?: ArticleProps[]
}

export interface Section {
  _id: string
  name: string
  slug?: string
  articles?: ArticleProps[]
}

export interface ArticleProps {
  _id: string
  title: string
  mainImage: any
  date: string
  intro?: any
  people: AuthorProps[]
  sections?: Section[]
  slug?: string
  variations?: {
    _key: string
    title: string
    mainImage: any
  }[]
  content?: any
  isHighlighted?: boolean
  brand?: 'tech' | 'lifestyle'
}

export type ArticlePreviewProps = Pick<
  ArticleProps,
  'title' | 'mainImage' | 'date' | 'intro' | 'people' | 'isHighlighted' | 'slug'
> & {sectionType?: 'featured' | 'normal'}

export interface MainImage {
  image: any
  alt: string
  caption: string
}

export type BrandSpecificProps = {
  brand?: 'tech' | 'lifestyle'
}
