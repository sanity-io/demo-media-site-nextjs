export interface AuthorProps {
  name: string
  slug?: string
  picture: any
  bio: any
}

export interface SectionProps {
  name: string
  slug?: string
}

export interface ArticleProps {
  _id: string
  title: string
  mainImage: any
  date: string
  intro?: any
  people: AuthorProps[]
  sections?: SectionProps[]
  slug?: string
  content?: any,
  variations?: {
    _key: string
    title: string
    mainImage: any
  }[]
}

export interface MainImage {
  image: any
  alt: string
  caption: string
}
