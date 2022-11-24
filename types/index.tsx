export interface AuthorProps {
  name: string
  slug?: string
  image: any
  bio: any
}

export interface SectionProps {
  name: string
  slug?: string
}

export interface ArticleProps {
  title: string
  mainImage: any
  date: string
  intro?: any
  people: AuthorProps[]
  sections?: SectionProps[]
  slug?: string
  content?: any
  isHighlighted?: boolean
}

export interface MainImage {
  image: any
  alt: string
  caption: string
}
