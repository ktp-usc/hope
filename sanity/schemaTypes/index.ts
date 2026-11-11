import {type SchemaTypeDefinition} from 'sanity'
import {blockContentType} from './blockContentType'
import {pageType} from './pageType'
import {partnerType} from './partnerType'
import {projectType} from './projectType'
import {siteSettings} from './siteSettings'
import {storyType} from './storyType'
import {timelineEventType} from './timelineEventType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    pageType,
    partnerType,
    projectType,
    siteSettings,
    storyType,
    timelineEventType,
  ],
}
