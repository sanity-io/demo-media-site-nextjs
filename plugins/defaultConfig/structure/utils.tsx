import React from 'react'
import {FiSliders} from 'react-icons/fi'
import {DocumentDefinition} from 'sanity'
import {StructureBuilder} from 'sanity/desk'

import {PreviewPane} from '../../PreviewPane'

export const createSiteSettingsNodeForBrand = (
  S: StructureBuilder,
  brandName: string
) =>
  S.listItem()
    .title('Settings')
    .icon(FiSliders)
    .child(
      S.document()
        .schemaType('siteSettings')
        .documentId(`${brandName}-siteSettings`)
        .title('Settings')
        .views([
          S.view.form(),
          S.view
            .component(({document}) => <PreviewPane document={document} />)
            .title('Preview'),
        ])
    )

export const createSchemaItemForBrand = (
  S: StructureBuilder,
  schemaItem: DocumentDefinition,
  brandName: string
) =>
  S.listItem()
    .title(schemaItem.title || schemaItem.name)
    .icon(schemaItem?.icon)
    .child(
      S.documentTypeList(schemaItem.name)
        .title(`${schemaItem.title}`)
        .filter(`_type == $schemaType && brand == $brand`)
        .params({
          schemaType: schemaItem.name,
          brand: brandName,
        })
        .initialValueTemplates([
          S.initialValueTemplateItem(`${schemaItem.name}-${brandName}`),
        ])
    )
