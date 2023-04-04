// import {config} from 'lib/config'
import {ReferenceDefinition, ReferenceFilterResolver} from 'sanity'

export const referenceBrandFilter: ReferenceFilterResolver = ({document}) => {
  return {
    filter: 'brand == $brand',
    params: {brand: document.brand},
  }
}

//@ts-ignore
export const referenceBrandInitialValue: ReferenceDefinition['initialValue'] = (
  params
) => {
  //eslint-disable-next-line no-console
  console.log('params', params)
  return {_ref: 'tech'}
}
