import { FiSliders } from 'react-icons/fi'
import { ConfigContext } from 'sanity'
import { StructureBuilder } from 'sanity/desk'

import {
  Brand,
  BRANDS,
  SchemaDivider,
  SchemaItem,
  SchemaSiteSettings,
} from '../../lib/constants'

const createSchemaItem = (
  S: StructureBuilder,
  schemaItem: SchemaItem | SchemaDivider | SchemaSiteSettings,
  brand: Brand
) => {
  let structureItem
  switch (schemaItem) {
    case 'divider':
      structureItem = S.divider()
      break
    case 'siteSettings':
      structureItem = S.listItem()
        .title('Settings')
        .icon(FiSliders)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(`${brand.name}-siteSettings`)
            .title('Settings')
        )
      break
    default:
      structureItem = S.listItem()
        .id(
          `${brand.name.toLowerCase()}-${schemaItem.title
            .toLowerCase()
            .replaceAll(` `, `-`)}`
        )
        .title(schemaItem.title)
        .icon(schemaItem?.icon)
        .child(
          S.documentTypeList(schemaItem.schemaType)
            .title(`${schemaItem.title}`)
            // .filter(
            //   `_type == $schemaType && (!defined(brand) || brand == $brand)`
            // )
            // TODO: Replace when brand is added by initial value template
            .filter(`_type == $schemaType && brand == $brand`)
            .params({
              schemaType: schemaItem.schemaType,
              brand: brand.name,
            })
            .initialValueTemplates([
              S.initialValueTemplateItem(`${schemaItem.schemaType}-brand`, {
                brand: brand.name,
              }),
            ])
        )
  }
  return structureItem
}

const createAllSchemaItems = (
  S: StructureBuilder,
  context: ConfigContext,
  brand: Brand
) => brand.structure.map((schemaItem) => createSchemaItem(S, schemaItem, brand))

const structure = (
  S: StructureBuilder,
  context: ConfigContext,
  brandType: string
) => {
  const brand = BRANDS.find((brand) => brand.name === brandType)
  if (!brand) {
    throw new Error(
      `Invalid brand '${brandType}' provided to structure resolver. Valid brands are: ${BRANDS.map(
        (brand) => brand.name
      ).join(', ')}`
    )
  }

  return S.list()
    .id(`${brand.name.toLowerCase()}-root`)
    .title(`${brand.title} content`)
    .items(createAllSchemaItems(S, context, brand).filter(Boolean))
}

export { structure }
