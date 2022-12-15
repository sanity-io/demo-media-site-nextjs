import {toPlainText} from '@portabletext/react'
import {toHTML} from '@portabletext/to-html'
import type {
  PortableTextBlock,
  PortableTextBlockStyle,
} from '@portabletext/types'
import {format, parseISO} from 'date-fns'

import {urlForImage} from '../../../lib/sanity'

interface TextBlock {
  type: 'paragraph' | 'heading'
  value: string
  html: string
  style: PortableTextBlockStyle
}

interface ModuleBlock {
  type: 'article' | 'image' | 'articles'
  [key: string]: unknown
}

function renderTextBlock(block: PortableTextBlock): TextBlock {
  if (block.style !== 'normal') {
    return {
      type: 'heading',
      value: toPlainText(block),
      html: toHTML(block),
      style: block.style,
    }
  }

  return {
    type: 'paragraph',
    value: toPlainText(block),
    html: toHTML(block),
    style: block.style,
  }
}

export function blocksToCustomContentBlocks(
  blocks: PortableTextBlock[] = []
): (ModuleBlock | TextBlock)[] {
  return blocks
    .map((block) => {
      if (block._type !== 'block') {
        return renderCustomBlock(block)
      }

      return renderTextBlock(block)
    })
    .filter(Boolean)
}

export function customToPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) => {
      if (block._type !== 'block') {
        return renderCustomBlock(block)
      }

      return toPlainText(block)
    })
    .filter(Boolean)
    .join('\n\n')
}

// @fixme: Add a proper type
export function renderCustomBlock(
  block: Record<string, any>
): ModuleBlock | null {
  switch (block._type) {
    case 'article':
      return {
        type: 'article',
        title: block.title,
        description: block?.intro ? toPlainText(block.intro) : null,
        slug: block.slug,
        imageUrl: block.mainImage
          ? urlForImage(block.mainImage?.image).height(600).width(600).url()
          : null,
        imageAlt: block?.mainImage?.alt,
        url: `https://demo-media-site-nextjs.sanity.build/articles/${block.slug}`,
      }
    case 'articleReferences':
      return {
        type: 'articles',
        articles: block?.references.filter(Boolean).map((article) => ({
          title: article?.title,
          description: article?.intro ? toPlainText(article.intro) : null,
          slug: article.slug,
          imageUrl: article.mainImage
            ? urlForImage(article.mainImage?.image).width(340).height(480).url()
            : null,
          imageAlt: block?.mainImage?.alt,
          url: `https://demo-media-site-nextjs.sanity.build/articles/${article.slug}`,
        })),
      }
    default:
      return null
  }
}

export function formatDate(dateValue: string): string {
  try {
    return format(parseISO(dateValue), 'LLLL d, yyyy')
  } catch (err) {
    return dateValue
  }
}

type Email = {
  subject: string
  content: PortableTextBlock[]
}

export function emailToHTML(email: Email): string {
  return `
    <h1>${email.subject}</h1>
    <p>${toPlainText(email.content)}</p>
  `
}
