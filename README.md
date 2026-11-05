# HOPE Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with [Sanity CMS](https://www.sanity.io).

## Environment Variables

Copy `.env.example` to `.env.local` and set the required variables:

```bash
cp .env.example .env.local
```

### Configuration Variables

| Variable | Required | Description | Example / Default |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes** | Sanity project ID, validated by `sanity/env.ts` on build/runtime | `a1pyoa63` |
| `NEXT_PUBLIC_SANITY_DATASET` | **Yes** | Sanity dataset name | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Sanity API version date (`YYYY-MM-DD`) | `2026-11-05` |
| `NEXT_PUBLIC_DONATIONS_ENABLED` | No | Feature flag to enable or disable donation workflows | `false` |

> **Important Deployment Note:** `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` must be configured in every deployment environment (e.g. Vercel project environment variables). `sanity/env.ts` asserts their presence at build time to prevent running or deploying with broken CMS integrations.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sanity Studio is accessible at `http://localhost:3000/studio`.

## Learn More

To learn more about Next.js and Sanity, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Sanity Documentation](https://www.sanity.io/docs) - learn about Sanity CMS schemas and queries.
- [Agent Skill: Sanity CMS](./sanity/skills.md) - repository guidelines for Sanity CMS integration.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Ensure that all required environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`) are set in your Vercel Project Settings under **Environment Variables** before deploying.
