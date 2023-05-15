import {StructureResolver} from 'sanity/desk'

import review from '../../../schemas/review'
import {createSchemaItemForBrand} from './utils'

export const reviewStructure: StructureResolver = (S) =>
  S.list()
    .id('review-root')
    .title('Review content')
    .items([createSchemaItemForBrand(S, review, 'review')])
