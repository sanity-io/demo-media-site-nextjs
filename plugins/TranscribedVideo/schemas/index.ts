import { SchemaTypeDefinition } from 'sanity'
import timestamp from './timestamp'
import transcribedMuxVideo from './transcribedMuxVideo'

export const schemaTypes = (
  prev: SchemaTypeDefinition[],
): SchemaTypeDefinition[] => [
  ...prev,
  timestamp,
  transcribedMuxVideo,
]