import { defineField, defineType } from "sanity";

export const recipe = defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country of origin",
      type: "string",
      description: "e.g. Vietnam, Mexico, Georgia",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          "East Asia",
          "Southeast Asia",
          "South Asia",
          "Middle East",
          "Africa",
          "Europe",
          "Mediterranean",
          "Latin America",
          "North America",
          "Caribbean",
          "Oceania",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short excerpt",
      type: "text",
      rows: 2,
      description: "One or two sentences shown on cards/listings",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "story",
      title: "Story / context",
      type: "text",
      rows: 6,
      description: "Why this dish, where it's from, a memory",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "prepTimeMinutes",
      title: "Prep time (minutes)",
      type: "number",
    }),
    defineField({
      name: "cookTimeMinutes",
      title: "Cook time (minutes)",
      type: "number",
    }),
    defineField({
      name: "totalTimeMinutes",
      title: "Total time (minutes)",
      type: "number",
    }),
    defineField({
      name: "servings",
      title: "Servings",
      type: "number",
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "steps",
      title: "Method steps",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "tips",
      title: "Tips / variations",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "dietTags",
      title: "Dietary tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Dairy-Free",
          "Halal",
          "Spicy",
          "Kid-Friendly",
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "country", media: "mainImage" },
  },
});
