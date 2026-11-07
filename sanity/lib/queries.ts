import { defineQuery } from 'next-sanity'

export const leadersQuery = defineQuery(`
  *[_type == "leader" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]
  | order(coalesce(order, 0) asc, name asc, _id asc) {
    _id, name, title, affiliation, bio, "order": coalesce(order, 0),
    headshot { asset, crop, hotspot, "assetUrl": asset->url }
  }
`)
