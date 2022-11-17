import React from 'react'
import client from 'part:@sanity/base/client'
import { useDocumentOperation } from '@sanity/react-hooks'
import blocksToHtml, { h } from '@sanity/block-content-to-html'
import mjml2html from 'mjml-browser'
import { isEmpty } from 'lodash'
import cardTemplate from '../mjml_templates/cardTemplate'

const updateOrCreatePostmarkTemplates = async (emails, apikey) => {
  return await fetch('/api/postmarkapp', {
    method: 'POST',
    body: JSON.stringify({ emails, apikey }),
  }).then((response) => response.text())
}

//likely we should inject the mj elements here
function BlockTypeSerializer(props) {
  const style = props.node.style || 'normal'

  if (/^h\d/.test(style)) {
    return h(style, null, props.children)
  }

  return style === 'blockquote'
    ? h('blockquote', null, props.children)
    : h('p', null, props.children)
}

const EmailVariableRenderer = ({ node: { variableType } }) => {
  return variableType.endsWith('Url')
    ? h('a', { href: `{{${variableType}}}` }, `{{${variableType}}}`)
    : h('span', null, `{{${variableType}}}`)
}

const EmailConditionalRenderer = ({
  node: { conditionalType, conditionalContent },
}) => {
  return h(
    'span',
    null,
    `{{#${conditionalType}}}${conditionalContent}{{/${conditionalType}}}`
  )
}

const getBlockContent = (body) => {
  return blocksToHtml({
    blocks: body,
    serializers: {
      types: {
        emailConditional: EmailConditionalRenderer,
        emailVariable: EmailVariableRenderer,
        block: BlockTypeSerializer,
        undefined: () => <span></span>,
      },
    },
    imageOptions: { w: 320, h: 240, fit: 'max' },
    ...{
      projectId: '3do82whm',
      dataset: 'next',
      useCdn: false,
    },
  })
}

const toPlainText = (blocks = []) => {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children
        .map(
          ({
            _type,
            variableType,
            conditionalType,
            conditionalContent,
            text,
          }) => {
            if (_type === 'emailVariable') {
              return `{{${variableType}}}`
            } else if (_type === 'emailConditional') {
              return `{{#${conditionalType}}}${conditionalContent}{{/${conditionalType}}}`
            } else {
              return text
            }
          }
        )
        .join('')
    })
    .join('\n\n')
}

export const fetchEmails = async (id) => {
  const { emails } = await client.fetch(
    `
    *[_type == 'emailFlow' && _id == $id][0]
    {
      'templateStyle': coalesce(template, 'logoCard'),
      emails[]{
            _key,
            htmlBody, 
            textBody,
            subject,
            alias,
            name
          }
      }
    `,
    { id }
  )
  if (emails.length === 1 && isEmpty(emails[0])) {
    throw new Error('missing emails!')
  }
  const htmlEmails = emails.map((email) => ({
    ...email,
    htmlBody: mjml2html(cardTemplate(getBlockContent(email.htmlBody))).html,
    textBody: toPlainText(email.textBody),
  }))
  return htmlEmails
}

const pushTemplatesToPostmark = async (htmlEmails, apikey) => {
  if (!apikey) {
    throw new Error('missing api key!')
  }
  const postmarkResponses = await updateOrCreatePostmarkTemplates(
    htmlEmails,
    apikey
  )
  return postmarkResponses
}

let serviceResponse = ''

export const PublishEmailToPostmark = ({ id, type, draft, onComplete }) => {
  const { patch, publish } = useDocumentOperation(id, type)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return {
    label: 'Push to Postmark',
    icon: () => '📧',
    onHandle: async () => {
      try {
        if (draft) {
          await publish.execute()
        }
        const apikey = window.prompt(
          'Please paste an API key from an appropriate message stream from postmarkapp.com'
        )
        const emails = await fetchEmails(id)
        serviceResponse = await pushTemplatesToPostmark(emails, apikey)
        setDialogOpen(true)
      } catch (e) {
        serviceResponse = e.message
        setDialogOpen(true)
      }
    },
    dialog: dialogOpen && {
      type: 'popover',
      onClose: onComplete,
      content: serviceResponse,
    },
  }
}
