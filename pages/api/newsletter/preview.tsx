import path from 'node:path'

import {toPlainText} from '@portabletext/react'
import {SanityDocumentStub} from '@sanity/client'
import * as fs from 'fs'
import mjml2html from 'mjml'
import {NextApiRequest, NextApiResponse} from 'next'
import {twig} from 'twig'

import {newslettersByIdQuery} from '../../../lib/queries/newsletter'
import {getClient} from '../../../lib/sanity.server'
import {
  blocksToCustomContentBlocks,
  customToPlainText,
  formatDate,
} from '../../../plugins/newsletter/utils/format'

function wrapIds(ids: any) {
  if (!Array.isArray(ids)) {
    return [ids]
  }

  return ids
}

function renderMjml(s: string) {
  return mjml2html(s).html
}

async function renderNewsletter(newsletter: SanityDocumentStub) {
  const data = {
    subject: newsletter.subject ?? newsletter.title,
    intro: toPlainText(newsletter.intro),
    publishDate: formatDate(newsletter.date),
    contentBlocks: blocksToCustomContentBlocks(newsletter.content),
    html: customToPlainText(newsletter.content),
    text: customToPlainText(newsletter.content),
  }

  const templateFile = await getTemplateFile()
  const template = twig({data: templateFile.toString()})

  try {
    const htmlOutput = renderMjml(template.render(data))
    return {data, htmlOutput}
  } catch (e) {
    throw e
  }
  // console.dir(data.contentBlocks)
}

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (secret && req.query.secret !== secret) {
  //   return res.status(401).json({ message: 'Invalid secret' })
  // }

  // If no ids is provided return error
  if (!req.query.ids) {
    return res.status(401).json({message: 'Invalid ids'})
  }

  // // Get newsletter by ids
  const newsletters = await getClient(true).fetch(newslettersByIdQuery, {
    ids: wrapIds(req.query.ids),
  })

  // If no newsletter is found return error
  if (!newsletters || newsletters?.length === 0) {
    return res.status(401).json({message: 'No newsletter documents found'})
  }

  const renderedNewsletter = await renderNewsletter(newsletters[0])

  return res.status(200).json({output: renderedNewsletter, newsletters})
}

function getTemplateFile(): Promise<Buffer> {
  return new Promise((resolve) => {
    const templateLocation = path.join(
      process.cwd(),
      'plugins/newsletter/templates/newsletter.mjml'
    )
    fs.readFile(templateLocation, (error, data) => {
      if (error) {
        throw error
      }
      return resolve(data)
    })
  })
}
