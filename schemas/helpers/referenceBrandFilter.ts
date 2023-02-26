import {ReferenceFilterResolver} from 'sanity'

export const referenceBrandFilter: ReferenceFilterResolver = ({document}) => {
  return {
    filter: 'brand == $brand',
    params: {brand: document.brand},
  }
}
