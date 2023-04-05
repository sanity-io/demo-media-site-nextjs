import {StructureResolver} from 'sanity/desk'

import article from '../../../schemas/article'
import person from '../../../schemas/person'
import section from '../../../schemas/section'
import {createSchemaItemForBrand, createSiteSettingsNodeForBrand} from './utils'

export const lifestyleStructure: StructureResolver = (S) =>
  S.list()
    .id('lifestyle-root')
    .title('Lifestyle content')
    .items([
      createSiteSettingsNodeForBrand(S, 'lifestyle'),
      S.divider(),
      createSchemaItemForBrand(S, article, 'lifestyle'),
      S.divider(),
      createSchemaItemForBrand(S, person, 'lifestyle'),
      createSchemaItemForBrand(S, section, 'lifestyle'),
    ])
