import { type SchemaTypeDefinition } from 'sanity'
import car from './car'
import reservation from './reservation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car,reservation],
}
