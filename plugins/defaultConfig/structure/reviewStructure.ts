import {StructureResolver} from 'sanity/structure'

import review from '../../../schemas/review'
import {createSchemaItemForBrand} from './utils'

export const reviewStructure: StructureResolver = (S) =>
  S.list()
    .id('review-root')
    .title('Review content')
    .items([createSchemaItemForBrand(S, review, 'reviews')])
