# Kitchen Passport — recipe blog starter
A Next.js + Sanity recipe blog: home cooking and comfort food from around
the world. Recipes display as postcards pinned to a corkboard, with a
postmark-style stamp showing each dish's country of origin.

## What's inside

- **Next.js 14 (App Router)** — the site itself
- **Sanity Studio**, embedded at `/studio` — where you write and edit recipes
- **Tailwind CSS** — styling
- Recipe pages include `schema.org/Recipe` structured data, so Google can
  show rich results (cook time, ingredients, etc.)

## 1. Install Node.js

You need Node.js 18 or later. Check with:

```
node -v
```

If you don't have it, get it from https://nodejs.org (the LTS version).

## 2. Install dependencies

Open a terminal in this folder and run:

```
npm install
```

## 3. Create a free Sanity project

Sanity is the CMS where you'll actually write recipes.

```
npx sanity@latest init
```

This will:
- Ask you to log in / create a free Sanity account
- Ask you to create a new project — name it anything, e.g. "Kitchen Passport"
- Ask for a dataset name — choose the default, `production`
- It may offer to write config files — you can say no, since this repo
  already has `sanity.config.ts` and the schema set up.

At the end it will print a **Project ID**. Copy it.

## 4. Set your environment variables

Copy the example file:

```
cp .env.local.example .env.local
```

Open `.env.local` and paste in your Project ID:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 5. Run it

```
npm run dev
```

- Visit **http://localhost:3000** to see the blog (it'll say "no recipes
  yet" at first — that's expected).
- Visit **http://localhost:3000/studio** to open the Sanity Studio and add
  your first recipe. Fill in the title, country, region, ingredients, and
  steps, then hit Publish.
- Refresh the homepage — your recipe will appear as a postcard.

## 6. Deploy it

The easiest path is [Vercel](https://vercel.com), made by the creators of
Next.js:

1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in with GitHub, and import the repo.
3. Add the same environment variables from `.env.local` in Vercel's project
   settings.
4. Deploy. You'll get a live URL in about a minute.

Your `/studio` route ships as part of the same site, so you (or anyone you
give access to) can edit recipes on the live site too, at
`yoursite.com/studio`.

## Project structure

```
app/
  page.tsx                 → homepage (corkboard hero)
  recipes/page.tsx         → all recipes listing
  recipes/[slug]/page.tsx  → single recipe page (with Recipe schema.org data)
  regions/[region]/page.tsx→ recipes filtered by region
  about/page.tsx           → about page — edit this with your own story
  studio/[[...tool]]/      → embedded Sanity Studio
  components/RecipeCard.tsx→ the postcard component
  globals.css              → colors, postcard/postmark styling

sanity/schemaTypes/recipe.ts → defines what fields a recipe has
sanity.config.ts              → Studio configuration
lib/sanity.ts                 → Sanity client + GROQ queries
```

## Customizing

- **Colors & fonts**: edit `app/globals.css` and `tailwind.config.ts`
- **Recipe fields**: edit `sanity/schemaTypes/recipe.ts` (e.g. add a "diet"
  tag, a video field, nutrition info) — restart `npm run dev` after
- **Site copy**: `app/page.tsx` (homepage headline) and `app/about/page.tsx`

## Troubleshooting

- **"No recipes yet" never goes away** — check `.env.local` has the right
  Project ID, and that you clicked **Publish** (not just saved a draft) in
  the Studio.
- **Images don't load** — this is expected until you upload an image to a
  recipe in the Studio.
- **Port 3000 already in use** — run `npm run dev -- -p 3001` instead.
