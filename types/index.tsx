import {SanityDocument, SanityImageAssetDocument} from '@sanity/client'
import {Image, PortableTextBlock, Slug} from 'sanity'
import {CrossDatasetReferenceValue} from 'sanity'

export type BrandSpecificProps = {
  brand?: 'tech' | 'lifestyle'
}

export interface MainImage {
  image: {
    asset: {
      _ref: string
    }
  }
  alt: string
  caption: string
}

export type SeoProps = {
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    synonyms?: string[]
    image?: Image
  }
}

export type Author = {
  name: string
  _type: 'person'
  slug?: string
  image: Image
  bio: PortableTextBlock[]
  role: string
  articles?: Article[]
} & BrandSpecificProps &
  SeoProps

export type Section = {
  _id?: string
  _type: 'section'
  name: string
  slug?: string
  articles?: Article[]
  brand?: 'tech' | 'lifestyle'
} & BrandSpecificProps &
  SeoProps

export type Article = {
  _id: string
  _type: 'article'
  title: string
  mainImage?: MainImage
  date?: string
  intro?: PortableTextBlock[]
  people?: Author[]
  sections?: Section[]
  slug?: string
  variations?: {
    _key: string
    title: string
    mainImage: MainImage
  }[]
  content?: PortableTextBlock[]
  isHighlighted?: boolean
} & BrandSpecificProps &
  SeoProps

export type Review = Pick<
  Article,
  | 'title'
  | 'mainImage'
  | 'intro'
  | 'isHighlighted'
  | 'slug'
  | 'content'
  | 'sections'
> & {_type: 'review'; soldOut?: boolean}

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

export const isArticle = (article: any): article is Article =>
  article._type === 'article'

export type CrossDatasetSource = {
  _type: 'image'
  asset: CrossDatasetReferenceValue & SanityImageAssetDocument
}

export type BrandSlugDocument = {
  slug?: Slug
} & BrandSpecificProps &
  SanityDocument

export type SEODocumentType = Article | Author | Section

export const isAuthor = (doc: any): doc is Author => doc._type === 'person'
