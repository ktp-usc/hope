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

export const INITIAL_DEFAULT_METHODS: DonationMethod[] = [
  {
    title: "PayPal Giving Fund",
    note: "Hands On Prosthetic Engineering - HOPE",
    url: "https://www.paypal.com/us/fundraiser/charity/2442369",
    buttonLabel: "Donate with PayPal",
    badgeText: "0% charity fees",
    colorTheme: "hope-blue",
    enabled: true,
  },
  {
    title: "Venmo Charity",
    note: "Direct app or web profile donation",
    url: "https://account.venmo.com/u/HandsOnHOPENGO",
    buttonLabel: "Donate with Venmo",
    badgeText: "@HandsOnHOPENGO",
    colorTheme: "venmo-blue",
    enabled: true,
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  donationsEnabled: false,
  donationMethods: INITIAL_DEFAULT_METHODS,
};

export const siteSettingsQuery = `*[_type == "siteSettings" && _id in ["siteSettings", "drafts.siteSettings"]][0]{
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
 * Provides safe default fallbacks if Sanity is unpopulated or unreachable.
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
        donationMethods: INITIAL_DEFAULT_METHODS,
      };
    }

    return {
      donationsEnabled:
        typeof data.donationsEnabled === "boolean"
          ? data.donationsEnabled
          : DEFAULT_SITE_SETTINGS.donationsEnabled,
      donationMethods: Array.isArray(data.donationMethods)
        ? data.donationMethods.filter((m) => m && m.enabled !== false && m.url)
        : INITIAL_DEFAULT_METHODS,
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
      donationMethods: INITIAL_DEFAULT_METHODS,
    };
  }
}
