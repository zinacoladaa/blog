import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// ---- Queries ----

export const allRecipesQuery = `*[_type == "recipe"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  country,
  region,
  totalTimeMinutes,
  mainImage,
  excerpt,
  ingredients,
  dietTags
}`;

export const recipeBySlugQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  country,
  region,
  story,
  totalTimeMinutes,
  prepTimeMinutes,
  cookTimeMinutes,
  servings,
  mainImage,
  ingredients,
  steps,
  tips,
  dietTags
}`;

export const recipesByRegionQuery = `*[_type == "recipe" && region == $region] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  country,
  region,
  totalTimeMinutes,
  mainImage,
  excerpt,
  dietTags
}`;

export const relatedRecipesQuery = `*[_type == "recipe" && region == $region && slug.current != $slug] | order(_createdAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  country,
  region,
  totalTimeMinutes,
  mainImage,
  excerpt
}`;

// ---- Blog ----

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->title
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  body,
  "author": author->{name, image, bio},
  "categories": categories[]->title
}`;
