import {StructureResolver} from 'sanity/desk'
import article from 'schemas/article'
import newsletter from 'schemas/newsletter'
import person from 'schemas/person'
import podcast from 'schemas/podcast'
import section from 'schemas/section'

import {createSchemaItemForBrand, createSiteSettingsNodeForBrand} from './utils'

export const techStructure: StructureResolver = (S) =>
  S.list()
    .id('tech-root')
    .title('Tech content')
    .items([
      createSiteSettingsNodeForBrand(S, 'tech'),
      S.divider(),
      createSchemaItemForBrand(S, article, 'tech'),
      createSchemaItemForBrand(S, newsletter, 'tech'),
      createSchemaItemForBrand(S, podcast, 'tech'),
      S.divider(),
      createSchemaItemForBrand(S, person, 'tech'),
      createSchemaItemForBrand(S, section, 'tech'),
    ])
