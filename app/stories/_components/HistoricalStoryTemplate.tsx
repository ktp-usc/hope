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

function StoryFigure({ image, hero = false }: { image: StoryImage; hero?: boolean }) {
  const placeholder = image.src === undefined;
  return (
    <figure
      className={
        hero
          ? "relative m-0 min-w-0 md:!-ml-[30px] md:[clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)] max-[800px]:!ml-0 max-[800px]:aspect-[3/2] max-[800px]:[clip-path:none]"
          : "relative m-0 min-w-0 min-[801px]:flex min-[801px]:min-h-0 min-[801px]:flex-col"
      }
    >
      <div
        className={
          placeholder
            ? `relative flex flex-col items-center justify-center gap-3.5 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#cddae5,#b9c9d8)] p-7 text-center text-[#425970] ${
                hero ? "h-full min-h-[350px] rounded-none max-[800px]:min-h-0" : "min-[801px]:flex-1 min-[801px]:min-h-0 min-[801px]:!aspect-auto"
              }`
            : `relative overflow-hidden ${
                hero ? "h-full min-h-[350px] rounded-none max-[800px]:min-h-0" : "min-[801px]:flex-1 min-[801px]:min-h-0 min-[801px]:!aspect-auto"
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
                : "block h-auto w-full rounded-[18px] object-cover"
            }
            style={{
              objectPosition: image.focalPosition ?? "center",
              objectFit: "cover",
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
              ? "absolute right-0 bottom-0 left-[7%] bg-[#111b31d9] px-[18px] py-2.5 text-sm text-white"
              : "mt-2.5 text-sm text-[#415269]"
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
      className={`[overflow-wrap:anywhere] font-sans text-lg leading-[1.5] text-[#111b31] max-[400px]:text-[17px] ${
        heroBackground === "blue" ? "bg-[#f3f9ff]" : "bg-[#fffdf7]"
      }`}
    >
      <article>
        <header
          className={`grid grid-cols-1 overflow-hidden md:grid-cols-[54%_46%] ${
            heroBackground === "blue" ? "bg-[#d3eafb]" : "bg-[#f8cd53]"
          }`}
        >
          <div className="relative isolate min-w-0 pt-[58px] pr-[60px] pb-[52px] pl-[max(28px,calc((100vw-min(80vw,1200px))/2))] max-[1100px]:pr-12 max-[1100px]:pl-[7%] max-[800px]:px-[7%] max-[800px]:py-10 max-[400px]:px-[5%]">
            <p className="!mb-[22px] flex items-center gap-[15px] text-xs font-bold uppercase tracking-wider text-[#111b31]">
              <span
                className="inline-block h-[7px] w-[35px] shrink-0 rounded-[5px] bg-[#e95c36]"
                aria-hidden="true"
              />
              H.O.P.E. Stories
            </p>
            <h1 className="relative m-0 max-w-[650px] text-[clamp(36px,4vw,56px)] font-bold leading-[1.08] tracking-[-0.035em] text-[#111b31] max-[400px]:text-[34px]">
              {title}
            </h1>
            {date && (
              <p className="relative m-0 !mt-[14px] text-[23px] font-medium text-[#111b31] max-[400px]:text-[21px]">
                {date}
              </p>
            )}
            <p className="relative m-0 !mt-4 max-w-[570px] leading-[1.5] text-[#111b31]">
              {introduction}
            </p>
            <div
              className="pointer-events-none absolute top-[18%] right-[7%] -z-10 h-[130px] w-[58px] max-[800px]:top-[12%] max-[800px]:right-[5%] max-[800px]:opacity-60"
              aria-hidden="true"
            >
              <span className="absolute h-3 w-[53px] -rotate-[42deg] rounded-[9px] bg-[#e95c36]" />
              <span className="absolute top-[100px] -right-10 h-3 w-[42px] -rotate-[28deg] rounded-[9px] bg-[#b8b1e8]" />
              <span className="absolute top-[122px] -right-[43px] h-3 w-[29px] rotate-[30deg] rounded-[9px] bg-[#c89ae7]" />
            </div>
            <div
              className="pointer-events-none absolute bottom-[55px] left-0 h-[85px] w-[55px] max-[1100px]:w-[30px] max-[1100px]:overflow-hidden max-[1100px]:opacity-50 max-[800px]:hidden"
              aria-hidden="true"
            >
              <span
                className={`absolute h-[13px] w-[60px] -translate-x-[7px] rotate-[20deg] rounded-[8px] ${
                  heroBackground === "blue" ? "bg-[#f8cd53]" : "bg-[#1665dc]"
                }`}
              />
              <span
                className={`absolute top-[53px] h-[13px] w-[60px] -translate-x-[7px] -rotate-[32deg] rounded-[8px] ${
                  heroBackground === "blue" ? "bg-[#f8cd53]" : "bg-[#1665dc]"
                }`}
              />
            </div>
          </div>
          <StoryFigure image={heroImage} hero />
        </header>

        <section
          className={`mx-auto grid w-[80%] max-w-[1200px] items-start py-[42px] pb-[50px] max-[1100px]:w-[86%] max-[800px]:grid-cols-1 max-[800px]:gap-8 max-[800px]:py-[34px] max-[800px]:pb-[42px] max-[400px]:w-[90%] ${
            supportingImages.length
              ? "grid-cols-[1.08fr_1fr] gap-[65px] max-[1100px]:gap-[42px]"
              : "grid-cols-1"
          }`}
          aria-label="The Story"
        >
          <div className={`min-w-0 ${supportingImages.length ? "" : "max-w-[720px]"}`}>
            <h2 className="m-0 mb-[22px] flex items-center gap-4 text-[29px] font-bold leading-[1.2] text-[#111b31] max-[800px]:text-[27px]">
              <span
                className="inline-block h-[7px] w-[35px] shrink-0 rounded-[5px] bg-[#e95c36]"
                aria-hidden="true"
              />
              The Story
            </h2>
            {children
              ? children
              : paragraphs?.map((paragraph, index) => (
                  <p key={index} className="m-0 text-[#111b31] [&+p]:mt-5">
                    {paragraph}
                  </p>
                ))}
            <StoryBackButton />
          </div>
          {supportingImages.length > 0 && (
            <div className="grid gap-3.5 max-[800px]:gap-[18px] min-[801px]:min-h-0 min-[801px]:self-stretch min-[801px]:[contain:size] min-[801px]:[container-type:inline-size] min-[801px]:[grid-auto-rows:minmax(0,1fr)]">
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
