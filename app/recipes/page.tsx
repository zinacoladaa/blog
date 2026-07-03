import { client, allRecipesQuery } from "@/lib/sanity";
import ScrollReveal from "../components/ScrollReveal";
import RecipeFilters from "../components/RecipeFilters";

export const revalidate = 60;

export default async function RecipesPage() {
  const recipes = await client.fetch(allRecipesQuery).catch(() => []);
  const rotations = [-2, 1.5, -1, 2.5, -3, 1, -1.5, 2];

  return (
    <section className="px-6 py-16">
      <ScrollReveal>
        <h1 className="font-display text-4xl mb-2">All Recipes</h1>
        <p className="text-parchment/60 mb-12 font-mono text-sm">
          {recipes.length} dish{recipes.length === 1 ? "" : "es"} and counting
        </p>
      </ScrollReveal>

      {recipes.length === 0 ? (
        <p className="text-parchment/60 font-mono text-sm">
          Nothing here yet — add a recipe in the{" "}
          <a href="/studio" className="underline text-gold">
            Studio
          </a>
          .
        </p>
      ) : (
        <RecipeFilters recipes={recipes} rotations={rotations} />
      )}
    </section>
  );
}
