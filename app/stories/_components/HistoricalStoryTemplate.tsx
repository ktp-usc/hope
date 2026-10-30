import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Footer from "@/components/footer";
import styles from "./HistoricalStoryTemplate.module.css";

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
  paragraphs: readonly string[];
  supportingImages?: readonly StoryImage[];
}

function StoryFigure({ image, hero = false }: { image: StoryImage; hero?: boolean }) {
  const placeholder = image.src === undefined;
  return <figure className={hero ? styles.heroFigure : styles.figure}>
    <div className={`${styles.placeholder} ${hero ? styles.heroPlaceholder : ""}`} style={{ position: "relative", overflow: "hidden", aspectRatio: hero ? undefined : (placeholder ? image.aspectRatio ?? 2 : 2) }}>
      {placeholder ? image.placeholderLabel && <><ImageIcon size={44} strokeWidth={1.25} aria-hidden="true" /><p>{image.placeholderLabel}</p></> : <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 800px) 100vw, 50vw"
      preload={hero}
      unoptimized={image.unoptimized}
      className={hero ? styles.heroPhoto : styles.supportingPhoto}
      style={{ objectPosition: image.focalPosition ?? "center", objectFit: "cover", position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />}
    </div>
    {image.caption && <figcaption>{image.caption}</figcaption>}
  </figure>;
}

/** One reusable story page; navigation stays in the shared layout. */
export default function HistoricalStoryTemplate({
  title, date, introduction, heroImage = {}, heroBackground = "yellow", paragraphs, supportingImages = [],
}: HistoricalStoryTemplateProps) {
  return <>
    <main className={`${styles.story} ${heroBackground === "blue" ? styles.blue : styles.yellow}`}>
      <article>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" />H.O.P.E. Stories</p>
            <h1>{title}</h1>
            {date && <p className={styles.date}>{date}</p>}
            <p className={styles.introduction}>{introduction}</p>
            <div className={styles.accents} aria-hidden="true"><span /><span /><span /></div>
            <div className={styles.edgeAccents} aria-hidden="true"><span /><span /></div>
          </div>
          <StoryFigure image={heroImage} hero />
        </header>
        <section className={`${styles.narrative} ${supportingImages.length ? "" : styles.withoutImages}`} aria-label="The Story">
          <div className={styles.storyCopy}>
            <h2><span aria-hidden="true" />The Story</h2>
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <Link className={styles.historyLink} href="/history"><ArrowLeft size={18} aria-hidden="true" />Back to H.O.P.E.&apos;s History</Link>
          </div>
          {supportingImages.length > 0 && <div className={styles.supportingImages}>
            {supportingImages.map((image, index) => <StoryFigure key={index} image={image} />)}
          </div>}
        </section>
      </article>
    </main>
    <Footer />
  </>;
}
