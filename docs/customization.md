# Turn the template into your tool site

中文版: [customization.zh-CN.md](customization.zh-CN.md)

The demo is **Wordsmith**, a word counter. Replacing it takes five main steps.

## 1. Pick one keyword

Each site should serve one clear search intent, such as "word counter" or "json formatter". Use that exact phrase in your title, hero heading, FAQ and first blog post.

## 2. Set the brand

Edit `src/config/site.ts`:

```ts
export const siteConfig = {
  name: "YourTool",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@yourdomain.com",
  twitter: "",
  locales: ["en", "zh"] as const,
  defaultLocale: "en" as const,
  // ...
};
```

Then change the colors in the design tokens at the top of `src/app/globals.css`, and the mark in `src/components/Logo.tsx`. Also update `name` in `package.json`.

## 3. Replace the tool

| File | What it does |
| --- | --- |
| `src/tool/analyze.ts` | Pure logic. Replace it with your tool's functions |
| `src/tool/Tool.tsx` | The interface on the home page |
| `tests/analyze.test.ts` | Unit tests for the logic |

Keep logic separate from the interface so you can test it without a browser.

If your tool sends input to a server, **change the copy**. The demo promises that text stays in the browser, in the hero badges, features, FAQ, About page and privacy policy.

## 4. Rewrite the copy

All text lives in `src/i18n/dictionaries/en.ts` and `zh.ts`. Update at least:

- `meta`: page title and description
- `hero`: main heading and badges
- `tool`: interface labels
- `how`, `features`, `faq`: home page sections
- `about` and `legal`: About, privacy and terms

TypeScript reports any key missing from a language. Have the privacy policy and terms reviewed for your site.

## 5. Publish content

Add posts to `src/content/blog/<locale>/<slug>.mdx`:

```mdx
export const meta = {
  title: "How many words is a blog post?",
  description: "Recommended lengths by post type.",
  date: "2026-01-15",
};

Your article in Markdown.
```

Use the same slug in each language so posts link to their translations. Two or three long-tail articles are a good start.

## Add a language

1. Add it to `locales`, `localeLabels` and `localeTags` in `src/config/site.ts`.
2. Copy `src/i18n/dictionaries/en.ts` to, for example, `ja.ts` and translate it.
3. Register it in `src/i18n/index.ts` and `src/app/[lang]/not-found.tsx`.

The default language has no URL prefix. Other languages use one, such as `/zh`.

## Ads and analytics

Both are off until you set them:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- Place ad units with `<AdSlot slot="your-ad-unit-id" />`. The two slot IDs in the template are placeholders, so replace them with your own.
- Without AdSense, slots show a dashed placeholder in development and nothing in production.
- The privacy policy shows its analytics and advertising sections only when these are configured.
- **The template has no cookie consent banner.** If you serve visitors in the EEA, UK or Switzerland, you need a consent solution before enabling ads or analytics.

## Launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` is your real domain, without a trailing slash
- [ ] Brand, email, logo and colors replaced
- [ ] No "Wordsmith" left in the copy
- [ ] Privacy policy matches what the site really does
- [ ] `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` pass
- [ ] `/sitemap.xml` and `/robots.txt` show your domain
- [ ] Sitemap submitted to Google Search Console

## Deploy

- **Vercel:** import the repository. The Hobby plan doesn't allow commercial use.
- **Node.js server or VPS:** run `npm run build`, then `npm start`.
- **Cloudflare Workers:** needs the `@opennextjs/cloudflare` adapter because the template uses a request proxy for language routing. This path hasn't been tested.
