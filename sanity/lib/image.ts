import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Generates an image URL builder for a Sanity image asset.
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
