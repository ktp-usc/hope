import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";

/** Real photographs require original dimensions and accessible alt text. */
export type StoryImage =
  | {
      src: ImageProps["src"];
      alt: string;
      width: number;
      height: number;
      caption?: string;
      /** Focal presets preserve the subject in the hero using Tailwind object-position utilities. */
      focalPosition?: "center 40%" | "center 45%";
      /** Bypass optimization for source files that fail the image optimizer. */
      unoptimized?: boolean;
    }
  | {
      /** An empty object reserves image space until an approved photograph is supplied. */
      src?: never;
      placeholderLabel?: string;
      caption?: string;
    };

export interface HistoricalStoryTemplateProps {
  title: string;
  date?: string;
  introduction: string;
  heroImage?: StoryImage;
  paragraphs: readonly string[];
  supportingImages?: readonly StoryImage[];
}

function StoryFigure({ image, hero = false }: { image: StoryImage; hero?: boolean }) {
  const placeholder = image.src === undefined;
  const focalPositionClass =
    image.src !== undefined && image.focalPosition === "center 45%"
      ? "object-[center_45%]"
      : image.src !== undefined && image.focalPosition === "center 40%"
        ? "object-[center_40%]"
        : "object-center";

  return (
    <figure className={hero ? "relative min-h-80 overflow-hidden lg:min-h-[440px]" : "min-w-0"}>
      <div
        className={`relative flex overflow-hidden ${
          hero
            ? "aspect-[3/2] items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 lg:aspect-auto lg:h-full"
            : "aspect-[2/1] items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300"
        } ${placeholder ? "gap-3 p-7 text-center text-slate-600" : ""}`}
      >
        {placeholder ? (
          image.placeholderLabel && (
            <>
              <ImageIcon size={44} strokeWidth={1.25} aria-hidden="true" />
              <p>{image.placeholderLabel}</p>
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
            className={`absolute inset-0 size-full object-cover ${focalPositionClass}`}
          />
        )}
      </div>
      {image.caption && (
        <figcaption
          className={
            hero
              ? "absolute inset-x-0 bottom-0 bg-ink/85 px-5 py-3 text-sm text-white"
              : "mt-2 text-sm text-quiet"
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
  paragraphs,
  supportingImages = [],
}: HistoricalStoryTemplateProps) {
  return (
    <main className="bg-white text-ink">
      <article>
        <header className="grid overflow-hidden bg-sun lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative flex min-w-0 flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-[max(3rem,calc((100vw-75rem)/2))] lg:py-16">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
              <span className="h-1.5 w-9 rounded-full bg-[#e95c36]" />
              H.O.P.E. Stories
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {date && <p className="mt-4 text-xl font-semibold">{date}</p>}
            <p className="mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
              {introduction}
            </p>
          </div>
          <StoryFigure image={heroImage} hero />
        </header>

        <section
          className={`mx-auto grid max-w-6xl items-start gap-10 px-6 py-10 sm:px-8 sm:py-14 lg:gap-16 ${
            supportingImages.length ? "lg:grid-cols-[1.08fr_0.92fr]" : ""
          }`}
          aria-label="The Story"
        >
          <div className={supportingImages.length ? "min-w-0" : "max-w-3xl"}>
            <h2 className="mb-6 flex items-center gap-4 text-2xl font-bold leading-tight sm:text-3xl">
              <span className="h-1.5 w-9 shrink-0 rounded-full bg-[#e95c36]" />
              The Story
            </h2>
            <div className="space-y-5 text-base leading-7 text-ink sm:text-lg sm:leading-8">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-hope/40 bg-white px-6 text-sm font-bold text-hope transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              href="/history"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to H.O.P.E.&apos;s History
            </Link>
          </div>
          {supportingImages.length > 0 && (
            <div className="grid min-w-0 gap-5">
              {supportingImages.map((image, index) => (
                <StoryFigure key={index} image={image} />
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}
