import {SchemaTypeDefinition} from 'sanity'

import timestamp from './timestamp'
import transcribedVideo from './transcribedVideo'

export const schemaTypes = (
  prev: SchemaTypeDefinition[]
): SchemaTypeDefinition[] => [...prev, timestamp, transcribedVideo]
