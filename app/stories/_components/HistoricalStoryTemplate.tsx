import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import StoryBackButton from "./StoryBackButton";

/** Real photographs require original dimensions and accessible alt text. */
export type StoryImage = {
  src: ImageProps["src"];
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** CSS object-position, such as "center 30%", to preserve the subject in the hero. */
  focalPosition?: string;
  /** Bypass optimization for source files that fail the image optimizer. */
  unoptimized?: boolean;
} | {
  /** An empty object reserves image space until an approved photograph is supplied. */
  src?: never;
  placeholderLabel?: string;
  aspectRatio?: number;
  caption?: string;
};

export interface HistoricalStoryTemplateProps {
  title: string;
  date?: string;
  introduction: string;
  heroImage?: StoryImage;
  heroBackground?: "yellow" | "blue";
  paragraphs?: readonly string[];
  supportingImages?: readonly StoryImage[];
  children?: React.ReactNode;
}

/**
 * Renders an image or placeholder figure within a story layout,
 * supporting responsive aspect ratios and hero clipping.
 */
function StoryFigure({ image, hero = false }: { image: StoryImage; hero?: boolean }) {
  const placeholder = image.src === undefined;
  return (
    <figure
      className={
        hero
          ? "relative m-0 min-w-0 aspect-[4/3] md:aspect-auto"
          : "relative m-0 min-w-0 min-[801px]:flex min-[801px]:min-h-0 min-[801px]:flex-col"
      }
    >
      <div
        className={
          placeholder
            ? `relative flex flex-col items-center justify-center gap-3.5 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#cddae5,#b9c9d8)] p-7 text-center text-[#425970] ${
                hero ? "h-full min-h-[300px] md:min-h-[380px]" : "min-[801px]:flex-1 min-[801px]:min-h-0"
              }`
            : `relative overflow-hidden rounded-2xl ${
                hero ? "h-full min-h-[300px] md:min-h-[380px]" : "min-[801px]:flex-1 min-[801px]:min-h-0"
              }`
        }
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: hero ? undefined : placeholder ? image.aspectRatio ?? 2 : 2,
        }}
      >
        {placeholder ? (
          image.placeholderLabel && (
            <>
              <ImageIcon size={44} strokeWidth={1.25} aria-hidden="true" />
              <p className="max-w-[280px] text-base">{image.placeholderLabel}</p>
            </>
          )
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 800px) 100vw, 50vw"
            preload={hero}
            unoptimized={image.unoptimized}
            className={
              hero
                ? "absolute inset-0 h-full w-full object-cover"
                : "block h-auto w-full rounded-xl object-contain"
            }
            style={{
              objectPosition: image.focalPosition ?? "center",
              objectFit: hero ? "cover" : "contain",
              position: hero ? "absolute" : undefined,
              inset: hero ? 0 : undefined,
              width: "100%",
              height: hero ? "100%" : "auto",
            }}
          />
        )}
      </div>
      {image.caption && (
        <figcaption
          className={
            hero
              ? "mt-2 text-center text-xs text-[#1a273d]/75 italic"
              : "mt-2.5 text-xs text-slate-600"
          }
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** One reusable story page; navigation stays in the shared layout. */
export default function HistoricalStoryTemplate({
  title,
  date,
  introduction,
  heroImage = {},
  heroBackground = "yellow",
  paragraphs,
  supportingImages = [],
  children,
}: HistoricalStoryTemplateProps) {
  return (
    <main
      className={`min-h-screen font-sans text-base leading-relaxed text-[#1a273d] ${
        heroBackground === "blue" ? "bg-[#ebf3fa]" : "bg-white"
      }`}
    >
      <article>
        <header
          className={`px-6 py-12 sm:py-16 lg:py-20 ${
            heroBackground === "blue" ? "bg-[#d3eafb]" : "bg-[#f7d06b]"
          }`}
        >
          <div className="mx-auto max-w-6xl grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-0.5 w-5 bg-[#1a273d]"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                  H.O.P.E. Stories
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1a273d] sm:text-5xl lg:text-6xl leading-[1.12]">
                {title}
              </h1>
              {date && (
                <p className="mt-3 text-lg font-semibold text-[#1a273d]/90 sm:text-xl">
                  {date}
                </p>
              )}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1a273d]/85 sm:text-lg">
                {introduction}
              </p>
            </div>
            <div className="w-full">
              <StoryFigure image={heroImage} hero />
            </div>
          </div>
        </header>

        <section
          className="mx-auto max-w-6xl px-6 py-14 sm:py-18 lg:py-22"
          aria-label="The Story"
        >
          <div
            className={`grid gap-12 items-start ${
              supportingImages.length > 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : "max-w-3xl"
            }`}
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-0.5 w-5 bg-[#f7d06b]"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a273d]">
                  Case Study
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1a273d] sm:text-3xl mb-6">
                The Story
              </h2>
              {children ? (
                children
              ) : (
                paragraphs?.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-slate-700 [&+p]:mt-5">
                    {paragraph}
                  </p>
                ))
              )}
              <div className="mt-8">
                <StoryBackButton />
              </div>
            </div>

            {supportingImages.length > 0 && (
              <div className="grid gap-6">
                {supportingImages.map((image, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
                    <StoryFigure image={image} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
