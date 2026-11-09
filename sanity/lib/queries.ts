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
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch<Partial<SiteSettings> | null>(
      siteSettingsQuery,
      {},
      {
        next: {
          revalidate: 30,
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

/* ==========================================================================
   Project Stories: Schemas, Types, GROQ Queries, and Fallback Data
   ========================================================================== */

export interface SanityImageWithMeta {
  _type?: string;
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

export interface SanityProjectStory {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  summary?: string;
  projectStatus?: string;
  heroImage?: SanityImageWithMeta | null;
  imageUrl?: string;
  body?: unknown[];
  featuredOnHome?: boolean;
  order?: number;
}

export interface ProjectStoryCard {
  title: string;
  slug: string;
  category: string;
  status: string;
  summary: string;
  imageUrl?: string;
  alt: string;
  featuredOnHome?: boolean;
  order?: number;
}

export interface FallbackStory {
  slug: string;
  title: string;
  subtitle: string;
  projectStatus: string;
  summary: string;
  introduction: string;
  heroBackground?: "yellow" | "blue";
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    focalPosition?: string;
    unoptimized?: boolean;
    caption?: string;
  };
  paragraphs: readonly string[];
  supportingImages?: readonly {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }[];
}

export interface UnifiedProjectStory {
  isFallback: boolean;
  title: string;
  slug: string;
  subtitle?: string;
  summary?: string;
  projectStatus?: string;
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    focalPosition?: string;
    unoptimized?: boolean;
    caption?: string;
  };
  heroBackground?: "yellow" | "blue";
  body?: unknown[];
  paragraphs?: readonly string[];
  supportingImages?: readonly {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }[];
}

/**
 * Static fallback definitions for the 3 foundational HOPE stories.
 * Preserved so that links never 404, while remaining fully editable
 * if published with matching slugs in Sanity Studio.
 */
export const FALLBACK_PROJECT_STORIES: Record<string, FallbackStory> = {
  "elis-bike-arm": {
    slug: "elis-bike-arm",
    title: "Eli’s Bike Arm — Designing for the Ride",
    subtitle: "Adaptive Device",
    projectStatus: "Iterative Engineering",
    summary:
      "A custom-engineered support arm mounted to a bicycle, providing Eli with a stable point of contact and counterforce while riding. Researched in 2017 and fitted in spring 2018, it exemplifies HOPE's iterative design approach.",
    introduction:
      "Eli’s Bike Arm started as a custom engineering challenge: add an arm to the bicycle that Eli could use as another point of contact and press against for counterforce while riding.",
    heroBackground: "yellow",
    heroImage: {
      src: "/images/projects/02_Eli_On_Bicycle.jpg",
      alt: "Eli smiling on his adapted bicycle with the custom bike arm attached",
      focalPosition: "center 45%",
      width: 1200,
      height: 800,
    },
    paragraphs: [
      "Research started in 2017, with the prototype being fitted in spring 2018, followed by continued design work that included development of a telescoping arm socket.",
      "The device took on a personality of its own along the way. Its shape resembled a dinosaur arm, leading to the nickname “Elijasaur.”",
      "As the project progressed, Eli was able to ride the adapted bicycle through his neighborhood using the bike-arm design.",
      "The project shows the iterative side of HOPE’s work: understanding a specific need, designing around it, fitting and testing prototypes, and continuing to refine the solution through real-world use.",
    ],
    supportingImages: [
      {
        src: "/images/projects/01_Eli_Bike_Arm_Detail.jpg",
        width: 1200,
        height: 800,
        alt: "Close view of the custom bike-arm attachment on Eli’s bicycle",
      },
      {
        src: "/images/projects/04_Eli_Bike_Assembly.jpg",
        width: 1200,
        height: 800,
        alt: "Bike-arm components and tools arranged on a wooden table",
      },
    ],
  },
  "ppe-response": {
    slug: "ppe-response",
    title: "When HOPE Shifted Its 3D Printers to PPE",
    subtitle: "Community Response",
    projectStatus: "Small-Batch Fabrication",
    summary:
      "During the pandemic, student members partnered with USC faculty and graduate students to redirect 3D printing toward mask extenders and face-shield components, answering an urgent public health need.",
    introduction:
      "During the COVID-19 response, HOPE members shifted part of their 3D-printing work toward personal protective equipment.",
    heroBackground: "blue",
    heroImage: {
      src: "/images/projects/09_HOPE_Face_Shield_Frames.png",
      alt: "Stacks of colorful 3D-printed face-shield frames around a HOPE sign",
      width: 1200,
      height: 800,
      unoptimized: true,
    },
    paragraphs: [
      "Working alongside a University of South Carolina professor and graduate students, HOPE students produced mask extenders and face-shield components using the same design, printing, and fabrication skills they had developed through other projects.",
      "The effort showed how HOPE members could adapt their technical skills to a different kind of need. Students used the equipment and experience available to them to contribute to the COVID-19 response while continuing the hands-on learning that is central to HOPE.",
      "It remains a strong example of HOPE’s model: students learning by designing, making, and responding to real problems as they arise.",
    ],
    supportingImages: [
      {
        src: "/images/projects/15_Face_Shields_Boxed_For_Shipping.jpg",
        width: 1200,
        height: 800,
        alt: "Packaged face shields arranged in a cardboard shipping box",
      },
    ],
  },
  "hands-on-beginnings": {
    slug: "hands-on-beginnings",
    title: "Where HOPE’s Hands-On Work Began",
    subtitle: "Prosthetic Exploration",
    projectStatus: "Foundational Roots",
    summary:
      "HOPE's origins began with open-source pediatric prosthetic hands, student buildathons, and cost-free community fittings, building the foundational CAD and fabrication capabilities the team relies on today.",
    introduction:
      "3D-printed prosthetic hands were at the center of HOPE’s early work.",
    heroBackground: "yellow",
    heroImage: {
      src: "/images/projects/11_First_HOPE_Printer_Build.jpg",
      alt: "Students gathered around a 3D printer on a classroom table",
      focalPosition: "center 40%",
      width: 1200,
      height: 800,
    },
    paragraphs: [
      "Students learned to print, assemble, and work with prosthetic-hand designs, drawing in part on designs and knowledge shared by the broader open-source prosthetics community. Early HOPE activities included hand and finger builds, student build-a-thons, and work intended to make these devices available without cost to recipients.",
      "Those projects also became a starting point for something broader. As students gained experience with CAD, 3D printing, fitting, and design iteration, HOPE began taking on problems that could not always be addressed with an existing design.",
      "Projects increasingly involved modifying components, developing task-specific adaptations, and creating custom approaches around an individual need.",
      "That progression helped shape the model HOPE continues to build on today: use accessible engineering tools as a starting point, give students meaningful hands-on experience, and be willing to design something different when the problem calls for it.",
    ],
    supportingImages: [
      {
        src: "/images/projects/08_HOPE_Printed_Hand.png",
        width: 1200,
        height: 800,
        alt: "A white 3D-printed prosthetic hand resting on a wooden table",
      },
    ],
  },
};

export const FALLBACK_CARD_LIST: ProjectStoryCard[] = Object.values(
  FALLBACK_PROJECT_STORIES
).map((story) => ({
  title: story.title,
  slug: story.slug,
  category: story.subtitle,
  status: story.projectStatus,
  summary: story.summary,
  imageUrl: story.heroImage.src,
  alt: story.heroImage.alt,
}));

export const projectStoriesQuery = `*[_type == "projectStory"] | order(order asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  subtitle,
  summary,
  projectStatus,
  heroImage,
  "imageUrl": heroImage.asset->url,
  featuredOnHome,
  order
}`;

export const projectStoryBySlugQuery = `*[_type == "projectStory" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  subtitle,
  summary,
  projectStatus,
  heroImage,
  "imageUrl": heroImage.asset->url,
  body,
  featuredOnHome,
  order
}`;

/**
 * Fetches project stories from Sanity Studio.
 * Preserves the 3 foundational stories (Eli's Bike Arm, COVID-19 PPE, Early 3D-Printed Hand Work)
 * so they always appear on /our-work, even before being created in Sanity or if Sanity is offline.
 */
export async function getProjectStories(): Promise<ProjectStoryCard[]> {
  try {
    const data = await client.fetch<SanityProjectStory[]>(
      projectStoriesQuery,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["projectStory"],
        },
      }
    );

    if (!Array.isArray(data) || data.length === 0) {
      return FALLBACK_CARD_LIST;
    }

    const sanityCards: ProjectStoryCard[] = data
      .filter((item) => item && item.slug)
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        category: item.subtitle || "Project Case Study",
        status: item.projectStatus || "Active",
        summary: item.summary || "",
        imageUrl: item.imageUrl,
        alt: item.heroImage?.alt || item.title,
        featuredOnHome: item.featuredOnHome,
        order: item.order,
      }));

    // Find any foundational stories not in Sanity and append them
    const sanitySlugs = new Set(sanityCards.map((c) => c.slug));
    const missingFoundational = FALLBACK_CARD_LIST.filter(
      (fallback) => !sanitySlugs.has(fallback.slug)
    );

    return [...sanityCards, ...missingFoundational];
  } catch (error) {
    console.error("Failed to fetch project stories from Sanity, using fallback stories:", error);
    return FALLBACK_CARD_LIST;
  }
}

/**
 * Fetches a single project story by slug.
 * If found in Sanity, returns rich-text story data.
 * If not in Sanity, checks the foundational fallback stories so links never 404.
 * If not found in either, returns null (triggering 404).
 */
export async function getProjectStoryBySlug(
  slug: string
): Promise<UnifiedProjectStory | null> {
  try {
    const data = await client.fetch<SanityProjectStory | null>(
      projectStoryBySlugQuery,
      { slug },
      {
        next: {
          revalidate: 60,
          tags: ["projectStory", `projectStory:${slug}`],
        },
      }
    );

    if (data && data.title) {
      return {
        isFallback: false,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        summary: data.summary,
        projectStatus: data.projectStatus,
        heroBackground: "yellow",
        heroImage: data.imageUrl
          ? {
              src: data.imageUrl,
              alt: data.heroImage?.alt || data.title,
              width: 1200,
              height: 800,
              caption: data.heroImage?.caption,
            }
          : undefined,
        body: data.body,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch story "${slug}" from Sanity, checking fallback:`, error);
  }

  // Fallback to foundational static stories if present
  const fallback = FALLBACK_PROJECT_STORIES[slug];
  if (fallback) {
    return {
      isFallback: true,
      title: fallback.title,
      slug: fallback.slug,
      subtitle: fallback.subtitle,
      summary: fallback.introduction || fallback.summary,
      projectStatus: fallback.projectStatus,
      heroBackground: fallback.heroBackground || "yellow",
      heroImage: fallback.heroImage,
      paragraphs: fallback.paragraphs,
      supportingImages: fallback.supportingImages,
    };
  }

  return null;
}
