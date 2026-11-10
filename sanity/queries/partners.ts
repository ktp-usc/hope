import { defineQuery } from 'next-sanity'

export const partnersQuery = defineQuery(`*[_type == "partner"] | order(order asc, name asc){
  _id,
  name,
  category,
  description,
  websiteUrl,
  "logoUrl": logo.asset->url
}`)

export type PartnerCategory = 'primary-network' | 'institutional' | 'incubator' | 'community'

export type Partner = {
  _id: string
  name: string
  category: PartnerCategory | null
  description: string | null
  websiteUrl: string | null
  logoUrl: string | null
}
