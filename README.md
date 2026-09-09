# rune-webflow-proxy

A lightweight Next.js proxy that serves Webflow CMS data to the frontend via a clean JSON API.

## Endpoints

- `GET /api/health` — Health check
- `GET /api/careers` — List all careers from Webflow CMS
- `GET /api/careers/:id` — Get a single career by Webflow item ID

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WEBFLOW_API_TOKEN` | Yes | Bearer token for Webflow API v2 |
| `WEBFLOW_COLLECTION_ID` | Yes | Webflow CMS collection ID |

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` from `.env.example` and add your Webflow token.

## Deployment

Deploy to Vercel. Add the environment variables in your project settings.


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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
