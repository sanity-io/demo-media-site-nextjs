import {Block, Image} from 'sanity'

export interface Author {
  name: string
  slug?: string
  image: Image
  bio: Block[]
  role: string
  articles?: Article[]
  brand?: 'tech' | 'lifestyle'
}

export interface Section {
  _id?: string
  name: string
  slug?: string
  articles?: Article[]
  brand?: 'tech' | 'lifestyle'
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  mainImage?: MainImage
  date?: string
  intro?: Block[]
  people?: Author[]
  sections?: Section[]
  slug?: string
  variations?: {
    _key: string
    title: string
    mainImage: MainImage
  }[]
  content?: Block[]
  isHighlighted?: boolean
  brand?: 'tech' | 'lifestyle'
}

export type Review = Pick<
  Article,
  'title' | 'mainImage' | 'intro' | 'isHighlighted' | 'slug' | 'content'
> & {_type: 'review'; soldOut?: boolean}

export interface MainImage {
  image: any
  alt: string
  caption: string
}

export type ArticlePreviewProps = Pick<
  Article,
  | 'title'
  | 'mainImage'
  | 'date'
  | 'intro'
  | 'people'
  | 'sections'
  | 'isHighlighted'
  | 'slug'
> & {sectionType?: 'featured' | 'normal'}

export type BrandSpecificProps = {
  brand?: 'tech' | 'lifestyle'
}

export const isArticle = (article: Article | Review): article is Article =>
  article._type === 'article'
