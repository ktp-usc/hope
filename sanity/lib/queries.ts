import { client } from "./client";

export type PaymentColorTheme =
  | "hope-blue"
  | "venmo-blue"
  | "stripe-purple"
  | "emerald"
  | "charcoal"
  | "amber"
  | "custom";

export interface DonationMethod {
  title: string;
  note?: string;
  url: string;
  buttonLabel?: string;
  badgeText?: string;
  colorTheme?: PaymentColorTheme | string;
  customColor?: string;
  enabled?: boolean;
}

export interface SiteSettings {
  donationsEnabled: boolean;
  donationMethods: DonationMethod[];
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  donationsEnabled: false,
  donationMethods: [],
};

export const siteSettingsQuery = `*[_type == "siteSettings" && _id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]{
  donationsEnabled,
  donationMethods[]{
    title,
    note,
    url,
    buttonLabel,
    badgeText,
    colorTheme,
    customColor,
    enabled
  }
}`;

/**
 * Fetches the singleton siteSettings document from Sanity CMS with a 30-second ISR cache.
 * When the donationMethods array is empty in Sanity, it strictly returns an empty array ([])
 * without synthesizing default payment cards.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch<Partial<SiteSettings> | null>(
      siteSettingsQuery,
      {},
      {
        next: {
          revalidate: 30, // 30-second revalidation as specified in KAN-10
          tags: ["siteSettings"],
        },
      }
    );

    if (!data) {
      const envDonations =
        process.env.DONATIONS_ENABLED ?? process.env.NEXT_PUBLIC_DONATIONS_ENABLED;

      return {
        donationsEnabled:
          envDonations !== undefined
            ? envDonations === "true"
            : DEFAULT_SITE_SETTINGS.donationsEnabled,
        donationMethods: [],
      };
    }

    return {
      donationsEnabled:
        typeof data.donationsEnabled === "boolean"
          ? data.donationsEnabled
          : DEFAULT_SITE_SETTINGS.donationsEnabled,
      donationMethods: Array.isArray(data.donationMethods)
        ? data.donationMethods.filter((m) => m && m.enabled !== false && m.url)
        : [],
    };
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity, using defaults:", error);
    const envDonations =
      process.env.DONATIONS_ENABLED ?? process.env.NEXT_PUBLIC_DONATIONS_ENABLED;

    return {
      donationsEnabled:
        envDonations !== undefined
          ? envDonations === "true"
          : DEFAULT_SITE_SETTINGS.donationsEnabled,
      donationMethods: [],
    };
  }
}

export const leadersQuery = `
  *[_type == "leader" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]
  | order(coalesce(order, 0) asc, name asc, _id asc) {
    _id, name, title, affiliation, bio, "order": coalesce(order, 0),
    headshot { asset, crop, hotspot, "assetUrl": asset->url }
  }
`
