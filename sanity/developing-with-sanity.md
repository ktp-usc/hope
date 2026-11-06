# Working with Sanity (simple guide)

**Sanity** is where the website’s text, images, and page structure live. You edit content in a web app called **Studio**. The public site **reads** that content using small **questions** we write in a language called **GROQ** (Sanity’s “ask for this content” syntax).

You don’t need to memorize everything below. Use it as a **checklist** when you start, and come back when you’re stuck.

---

## What you’ll use day to day

- **Studio** — add and edit content (like a friendly admin panel). In this project it runs at [http://localhost:3000/studio](http://localhost:3000/studio) after you start the app.
- **Vision** — a tool *inside* Studio where you can try those “questions” (GROQ) and see the answers as JSON. Good for learning and for checking what the website can receive.

If you only edit content, Studio may be enough. If you help **connect** content to the site, you’ll also use Vision and talk to whoever writes the React/Next code.

---

## First-time setup (for anyone running the project)

1. Create a free account at [sanity.io](https://www.sanity.io/) if you don’t have one.
2. Ask a teammate to **invite you** to the same Sanity project the team uses.
3. Copy **`.env.example`** to **`.env.local`** and fill in the values someone on the team gives you.  
   Think of this file as “keys and addresses” so your computer can talk to the right Sanity project. Ideally **never** paste real keys into Discord or email; use whatever secure method your team uses.
4. In a terminal, from the project folder:
   ```bash
   npm install
   npm run dev
   ```
5. Open the site at [http://localhost:3000](http://localhost:3000) and Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

If Studio is blank or errors, double-check `.env.local` with a teammate and restart `npm run dev`.

---

## What kind of content exists?

**Pages**  
Each **page** has a title, a **slug** (the short name used in URLs, like `about` or `support`), and a list of **sections**. Each section is one block of the page: hero, text, team list, etc.

**Reusable pieces**  
Some things are saved once and **reused** on pages:

- **Cards** — used in card grids  
- **Partner logos** — used in partner sections  
- **Team members** — used in team sections  
- **Past events** — used in gallery sections  

In Studio you’ll see separate lists for **Pages** and these reusable items. That’s normal.

---

## Trying a “question” in Vision (GROQ)

1. Open Studio, then open **Vision** from the sidebar.
2. Paste a query, click run, and look at the result.

**Example — get one page by its URL slug** (replace the slug when you try it):

```groq
*[_type == "page" && slug.current == "support"][0]
```

**Example — list all pages with just title and slug:**

```groq
*[_type == "page"]{ title, "slug": slug.current }
```

When a section **points to** cards or team members, the query often needs a little extra syntax so Sanity **includes the full card or person**, not just an empty link. A developer can help with that the first time; the [GROQ docs](https://www.sanity.io/docs/groq) also explain it step by step.

---

## How this fits the code (high level)

- The **shape** of each content type (which fields exist) is defined in code under **`sanity/schemaTypes/`**. If something is missing in Studio, that folder is the source of truth.
- The website loads content using **`sanityFetch`** (see **`sanity/lib/live.ts`**). A developer wraps your GROQ query in code so a page can show the result.

If you’re not comfortable in code yet: **perfect your query in Vision**, then share it with a developer who can plug it into the app.

---

## Example: one CMS page end to end (query + show on screen)

This is the pattern for **rewriting** a hardcoded page (like Support or About) so it reads from Sanity instead.

### Step 1 — Agree on the slug

In Studio, the **page** document should use a **slug** that matches the route you’re building, e.g. `support` for `/support`. Test in Vision first:

```groq
*[_type == "page" && slug.current == "support"][0]{ title, sections }
```

Adjust the query until it returns every field the UI needs. For sections that **link to** other documents (cards, team, etc.), expand those links in GROQ (the `->` pattern) so you get real titles and text, not empty references.

### Step 2 — Put the query in the repo

Create a file such as **`sanity/queries/supportPage.ts`** (one file per page is easy to find; your team can pick another folder name if you prefer):

```ts
import { defineQuery } from "next-sanity";

export const supportPageQuery = defineQuery(`
  *[_type == "page" && slug.current == "support"][0]{
    title,
    sections[]{
      _key,
      _type,
      _type == "sectionHero" => {
        headline,
        subheadline,
        ctaLabel,
        ctaHref
      },
      _type == "sectionCardGrid" => {
        sectionTitle,
        intro,
        "cards": cards[]->{
          key,
          title,
          subtitle,
          description,
          details,
          cta,
          badge
        }
      }
    }
  }
`);
```

`_key` gives each section a stable id so React can use it as a **`key`** when you loop. Add more `_type == "…" => { … }` blocks as you need more section types.

### Step 3 — Fetch on the page (Server Component)

In **`app/support/page.tsx`** (or whichever route), use an **async** server page and **`sanityFetch`**. This runs on the server and can keep working with **`<SanityLive />`** in the layout when your env tokens are set.

```tsx
import { sanityFetch } from "@/sanity/lib/live";
import { supportPageQuery } from "@/sanity/queries/supportPage";

export default async function SupportPage() {
  const { data: page } = await sanityFetch({ query: supportPageQuery });

  if (!page) {
    return <main><p>This page is not in the CMS yet.</p></main>;
  }

  return (
    <main>
      {page.sections?.map((section) => {
        switch (section._type) {
          case "sectionHero":
            return (
              <section key={section._key} className="…">
                <h1>{section.headline}</h1>
                {section.subheadline && <p>{section.subheadline}</p>}
                {section.ctaLabel && section.ctaHref && (
                  <a href={section.ctaHref}>{section.ctaLabel}</a>
                )}
              </section>
            );

          case "sectionCardGrid":
            return (
              <section key={section._key} className="…">
                {section.sectionTitle && <h2>{section.sectionTitle}</h2>}
                {section.intro && <p>{section.intro}</p>}
                <ul>
                  {section.cards?.map((card) => (
                    <li key={card._id}>
                      <h3>{card.title}</h3>
                      {card.subtitle && <p>{card.subtitle}</p>}
                      <p>{card.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
```

### About `"use client"` when you move a page to Sanity

In the Next.js **App Router**, files under `app/` are **Server Components** unless you add **`"use client"`** at the very top.

| | Server Component (default) | Client Component (`"use client"`) |
|--|---------------------------|-----------------------------------|
| **Runs where** | On the server when the page is built or requested | In the user’s browser |
| **`async` page** | Allowed — this is how you use **`await sanityFetch(...)`** | **Not allowed** on the default export |
| **Good for** | Loading CMS data, SEO-friendly HTML | Buttons, forms, `useState`, `useEffect`, carousels, anything that needs the browser |

**Rule of thumb:** the file that calls **`sanityFetch`** should **not** start with `"use client"`. If your current page is one big client file (like many of ours with `"use client"` and only static content), you can remove `"use client"` from **`page.tsx`** and fetch there.

If part of the page **must** stay client-side (e.g. a form, a modal, `useState`, or a library that requires the browser), **split into two files**:

1. **`app/support/page.tsx`** (server — **no** `"use client"`)  
   - `async function`  
   - `const { data } = await sanityFetch({ query: ... })`  
   - `return <SupportContent page={data} />`  

2. **`app/support/SupportContent.tsx`** (client — **yes** `"use client"`)  
   - `export function SupportContent({ page }: { page: ... })`  
   - All your existing interactive UI, but **text and structure come from the `page` prop** instead of hardcoded arrays.

You can pass **only the pieces** that need interactivity as props if that keeps the server file simpler.

### Step 4 — Match your real design

Replace the plain `<section>` / `<ul>` markup with your existing components and Tailwind classes. The **data path** stays the same: query → `sanityFetch` → `map` over `sections` → branch on `section._type`.

### Step 5 — Rich text and images (when you need them)

#### What is “Portable Text,” and why `@portabletext/react`?

Some Sanity fields are **rich text** (bold, links, bullet lists, etc.). In the schema they are usually an **array of blocks**, not a single string of HTML. For example, **`sectionRichText`** has a `content` field that works this way.

That array is **Portable Text** — Sanity’s standard JSON format for rich content. You **cannot** show it on the site by writing `{section.content}` in JSX; React would just print `[object Object]` or break.

**`@portabletext/react`** is the official React library whose job is: **take that block array and output real paragraphs, headings, and links.** It is **already a dependency** of this repo (see **`package.json`**); a normal **`npm install`** is enough to get it on your machine.

Include the field in your GROQ query as usual, then render it roughly like:

```tsx
import { PortableText } from "@portabletext/react";

<PortableText value={section.content} />
```

You only need **`<PortableText />`** when you render those **block** fields (e.g. **`sectionRichText`**). Plain **`string`** and **`text`** fields work with normal `{section.intro}`-style JSX.

#### Images

Sanity stores image **metadata**, not a full URL string. To get a normal URL for `<img>` or Next **`Image`**, use **`urlFor(...)`** from **`sanity/lib/image.ts`** (see Sanity’s [image URL docs](https://www.sanity.io/docs/image-url)). Editors still just upload in Studio; the app builds the URL in code.

---

## Images (reminder)

Same as above: use **`urlFor`** for any **`image`** field you fetch from GROQ.

---

## If something goes wrong

- **Empty result in Vision** — Is the page **published**? Is the slug spelled exactly right? Are you on the same **dataset** as the team (usually in `.env.local`)?
- **Studio won’t open** — `.env.local` is wrong or missing; ask the team for the correct values.
- **Field names** — If Vision says a field doesn’t exist, open the matching file in **`sanity/schemaTypes/`** and use the exact names you see there.

---

## Need more detail?

- [Sanity: what is GROQ?](https://www.sanity.io/docs/groq)  
- [Vision tool](https://www.sanity.io/docs/the-vision-plugin)  
- Token types and env variable names: **`.env.example`** in this repo  
