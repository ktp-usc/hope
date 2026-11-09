import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import HistoricalStoryTemplate from "../_components/HistoricalStoryTemplate";
import { getProjectStoryBySlug, getProjectStories } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) return null;
      let src = "";
      try {
        src = urlFor(value).url();
      } catch {
        return null;
      }
      return (
        <figure className="my-8 overflow-hidden rounded-2xl bg-[#f1f5f9]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={src}
              alt={value.alt || "Story photograph"}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2.5 text-center text-sm text-[#475569] italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight text-[#102743]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-bold tracking-tight text-[#102743]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 mb-2 text-xl font-bold text-[#102743]">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-[#111b31]">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-[#1260d6] pl-4 italic text-[#475569]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-semibold text-[#1260d6] underline hover:text-[#0d47a1]"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-[#111b31]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-[#111b31]">{children}</ol>
    ),
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getProjectStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found | H.O.P.E. Stories",
    };
  }

  return {
    title: `${story.title} | H.O.P.E. Stories`,
    description:
      story.summary ||
      "A project case study from Hands on Prosthetic Engineering (H.O.P.E.)",
  };
}

export async function generateStaticParams() {
  const defaultSlugs = [
    { slug: "elis-bike-arm" },
    { slug: "ppe-response" },
    { slug: "hands-on-beginnings" },
  ];

  try {
    const stories = await getProjectStories();
    const slugs = stories.map((s) => ({ slug: s.slug }));
    return slugs.length > 0 ? slugs : defaultSlugs;
  } catch {
    return defaultSlugs;
  }
}

export default async function StorySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getProjectStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <HistoricalStoryTemplate
      title={story.title}
      date={story.subtitle || story.projectStatus}
      introduction={story.summary || ""}
      heroBackground={story.heroBackground || "yellow"}
      heroImage={story.heroImage}
      paragraphs={story.paragraphs}
      supportingImages={story.supportingImages}
    >
      {story.body && story.body.length > 0 && (
        <div className="space-y-4">
          <PortableText value={story.body} components={portableTextComponents} />
        </div>
      )}
    </HistoricalStoryTemplate>
  );
}

