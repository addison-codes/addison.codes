import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import gameReview from './gameReview'
import post from './post'

export const schemaTypes = [post, gameReview, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, gameReview, blockContent],
}
