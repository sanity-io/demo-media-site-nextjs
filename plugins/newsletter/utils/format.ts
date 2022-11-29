import type {
  PortableTextBlock,
  PortableTextBlockStyle,
} from '@portabletext/types'
import { toPlainText } from '@portabletext/react'
import { format, parseISO } from 'date-fns'
import { toHTML, uriLooksSafe } from '@portabletext/to-html'
import { urlForImage } from '../../../lib/sanity'

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
        console.log(block)
        return renderCustomBlock(block)
      }

      return renderTextBlock(block)
    })
    .filter(Boolean)
}

export function customToPlainText(blocks: PortableTextBlock[] = []) {
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

export function renderCustomBlock(block): ModuleBlock | null {
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
            ? urlForImage(article.mainImage?.image).width(600).height(320).url()
            : null,
          imageAlt: block?.mainImage?.alt,
          url: `https://demo-media-site-nextjs.sanity.build/articles/${article.slug}`,
        })),
      }
    default:
      return null
  }
}

export function formatDate(dateValue: string) {
  try {
    return format(parseISO(dateValue), 'LLLL d, yyyy')
  } catch (err) {
    return dateValue
  }
}

export function emailToHTML(email) {
  return `
    <h1>${email.subject}</h1>
    <p>${toPlainText(email.content)}</p>
  `
}
