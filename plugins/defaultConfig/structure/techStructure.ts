import {Role} from 'sanity'
import {StructureResolver} from 'sanity/desk'

import article from '../../../schemas/article'
import newsletter from '../../../schemas/newsletter'
import person from '../../../schemas/person'
import podcast from '../../../schemas/podcast'
import section from '../../../schemas/section'
import {createSchemaItemForBrand, createSiteSettingsNodeForBrand} from './utils'

export const techStructure: StructureResolver = (S, context) => {
  const {currentUser} = context
  const roles = currentUser?.roles || []
  //don't block out editors from the real life project! :)
  const isAdmin = !!roles.find(
    (role: Role) => role.name === 'administrator' || role.name === 'editor'
  )

  const adminItems = [
    createSiteSettingsNodeForBrand(S, 'tech'),
    S.divider(),
    createSchemaItemForBrand(S, article, 'tech'),
    createSchemaItemForBrand(S, newsletter, 'tech'),
    createSchemaItemForBrand(S, podcast, 'tech'),
    S.divider(),
    createSchemaItemForBrand(S, person, 'tech'),
    createSchemaItemForBrand(S, section, 'tech'),
  ]

  const contributorItems = [
    createSchemaItemForBrand(S, article, 'tech'),
    S.divider(),
    createSchemaItemForBrand(S, person, 'tech'),
    createSchemaItemForBrand(S, section, 'tech'),
  ]

  return S.list()
    .id('tech-root')
    .title('Tech content')
    .items(isAdmin ? adminItems : contributorItems)
}
