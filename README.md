# H.O.P.E. Website

The H.O.P.E. website is the public-facing site for Hands on Prosthetic Engineering. It introduces the organization's mission, shares information about its work and partners, and gives visitors ways to learn about H.O.P.E. or offer support.

The organization has two closely coordinated parts: H.O.P.E. Inc., an independent 501(c)(3) nonprofit, and the H.O.P.E. student organization at the University of South Carolina. The nonprofit provides continuity and organizational support; students carry out much of the hands-on design, fabrication, and outreach.

## Project status

The project includes an embedded Sanity Studio and a Sanity client. The current CMS integration manages global donation settings for the support/donation page. Most other website copy and page content is still maintained in the Next.js source files; it is not automatically editable in Sanity.

For product goals and additional context, see [PRODUCT.md](./PRODUCT.md).

## Technology

- **Next.js 16 App Router** provides the web server, routing, layouts, and page rendering.
- **React 19 and TypeScript** are used to build the interface and keep component and data code typed.
- **Tailwind CSS 4** provides utility-based styling. Global styles and design tokens are in `app/globals.css`.
- **Lucide React and Radix UI** provide icons and accessible interface primitives.
- **TanStack React Query and Zustand** are available for client-side server-state and local-state management. Use them where appropriate; their presence as dependencies does not mean every page needs them.
- **Sanity and `next-sanity`** provide the embedded Studio, structured content schema, and server-side CMS queries.
- **ESLint** checks code quality. The project does not currently define a separate test script.

## Getting started

### Prerequisites

- Node.js compatible with the installed Next.js version.
- npm (the repository includes `package-lock.json`).

### Install and run

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Next.js hot reloads the site as files are edited.

Other useful commands:

```bash
npm run lint   # Run ESLint
npm run build  # Create a production build
npm start      # Serve the production build (run npm run build first)
```

## How the code is organized

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, route-specific components and styles, global styles, and the shared root layout. A folder with a `page.tsx` file defines a route. |
| `app/layout.tsx` | Wraps all routes with the shared header and footer, loads the site fonts, and defines site-wide metadata. |
| `app/globals.css` | Global CSS, Tailwind setup, and shared design tokens. |
| `components/` | Components reused across routes, including the header, footer, and UI controls. |
| `components/ui/` | Reusable low-level interface components. |
| `client/api/` | Client-side API helpers. `jsonutils.ts` provides JSON fetch and POST helpers. |
| `client/queries/` | A home for shared React Query query keys; currently a small scaffold. |
| `lib/` | Shared utilities, including class-name helpers. |
| `sanity/` | Sanity environment configuration, schemas, Studio structure, client, image helper, and CMS queries. |
| `sanity/schemaTypes/` | Sanity document schemas. `siteSettings` is currently the CMS document type used by the site. |
| `public/` | Static files served from the site root, such as logos and photos. Reference a file here by its path under `/`, for example `/images/hero.jpg`. |
| `PRODUCT.md` | Product purpose, users, content direction, and project constraints. |

### Current routes and content

- `/` — home page (`app/page.tsx`).
- `/about` — organization history and leadership (`app/about/page.tsx`).
- `/support` — support and donation page; this is the route that reads Site Settings from Sanity (`app/support/`).
- `/donate` — rewritten to `/support` by `next.config.ts`.
- `/partners-and-collaborations` — partner information (`app/partners-and-collaborations/`).
- `/studio` — embedded Sanity Studio for authorized editors (`app/studio/[[...tool]]/page.tsx`).

Much of the site content (for example, home-page cards and the About-page milestones and leaders) is defined in page files as arrays or JSX. To change content not managed by the current Sanity schema, edit the relevant source file, run the site locally, and review the result before opening a pull request. Images used by the app are generally stored in `public/` or alongside the page that uses them.

## Environment configuration

The Sanity-enabled setup provides an `.env.example` template. Copy it to `.env.local` and fill in the project values supplied by the team. Local environment files are excluded from Git; never commit secrets.

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-11-05"
NEXT_PUBLIC_DONATIONS_ENABLED="false"
```

`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` identify the Sanity project and dataset; `NEXT_PUBLIC_SANITY_API_VERSION` selects the API version (the app has a default if it is omitted). These values are read by `sanity/env.ts` and used by both the Studio and the application client. Use the organization's intended dataset, and ask a project administrator for access if Studio or content queries are unavailable.

The Sanity project ID, dataset name, and API version are configuration, not API secrets. Do not put private tokens or credentials in `NEXT_PUBLIC_` variables. The current integration does not require a read token for its configured public content.

`NEXT_PUBLIC_DONATIONS_ENABLED` is a fallback used when no Sanity Site Settings document is available. `true` enables direct donations; otherwise donations default to off. When a published Sanity Site Settings document is present, its `donationsEnabled` value controls the page.

## Using Sanity

### Open Studio

Start the application with `npm run dev`, then open [http://localhost:3000/studio](http://localhost:3000/studio). Sign in with an account that has access to the organization's Sanity project. Studio is mounted in the Next.js app at `/studio`; it is not a separate local application. The Vision tool in Studio can be used to try GROQ queries against the configured dataset.

### Edit site donation settings

The current schema defines a `siteSettings` singleton, shown in Studio as **Site Settings**. Use it to:

- Turn direct donations on or off with **Donations Toggle**.
- Add, edit, remove, reorder, and enable or disable **Donation Methods**.
- Configure each method's title, destination URL, button label, optional note and badge, and button color theme. A custom color theme requires a valid hex color.

The support/donation page reads these settings on the server through `getSiteSettings()` in `sanity/lib/queries.ts`. Settings are cached with a 30-second revalidation interval. If the document is missing or a fetch fails, the page falls back to donations being off (or the environment flag) and no donation methods; fetch failures are logged on the server. Publish changes in Studio for them to take effect on the public site.

### How the integration is organized

- `sanity.config.ts` configures the embedded Studio, its `/studio` base path, document schema, navigation structure, and Vision plugin.
- `sanity/schemaTypes/` defines the content model. `siteSettings.ts` is the current singleton schema; update the schema and Studio structure when adding content types.
- `sanity/env.ts` reads the project ID, dataset, and API version from environment variables.
- `sanity/lib/client.ts` creates the `next-sanity` client.
- `sanity/lib/queries.ts` contains the Site Settings GROQ query, TypeScript data types, and `getSiteSettings()` helper used by the support page.
- `sanity/lib/image.ts` provides a helper for building Sanity image URLs.
- `sanity/lib/live.ts` exports Sanity's live-query helpers. A page must actually use the appropriate helper and render `SanityLive` for that behavior; the current Site Settings query uses the client directly with timed revalidation.
- `sanity/developing-with-sanity.md` contains an additional working guide. Its generic examples describe possible future page integrations; check the actual schema in `sanity/schemaTypes/` before assuming a content type exists.

When adding CMS-backed content, define and validate its schema first, write a GROQ query for the required fields, fetch it in a Next.js Server Component, and pass typed data into interactive client components as props. Keep secrets server-side, test missing/empty content as well as populated data, and avoid storing recipient medical or diagnostic information in Sanity.

For official references, see [Sanity documentation](https://www.sanity.io/docs), [Sanity Studio](https://www.sanity.io/docs/studio), [GROQ](https://www.sanity.io/docs/content-lake/groq), and the [Next.js integration guide](https://www.sanity.io/docs/nextjs).

## Contributing

- Keep content accurate, accessible, and respectful of the people H.O.P.E. serves.
- Use approved H.O.P.E. imagery and do not add unapproved stock imagery.
- Do not add private recipient or medical information to the public site, source code, or a future CMS dataset.
- Keep changes focused, run the lint/build checks above, and describe any content or behavior changes in the pull request.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Sanity documentation](https://www.sanity.io/docs)

The site can be deployed on Vercel or another platform that supports Next.js. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for deployment options.
