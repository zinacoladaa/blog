import { client, recipesByRegionQuery } from "@/lib/sanity";
import RecipeCard from "../../components/RecipeCard";
import ScrollReveal from "../../components/ScrollReveal";

export const revalidate = 60;

type Props = { params: { region: string } };

export default async function RegionPage({ params }: Props) {
  const region = decodeURIComponent(params.region);
  const recipes = await client
    .fetch(recipesByRegionQuery, { region })
    .catch(() => []);
  const rotations = [-2, 1.5, -1, 2.5, -3, 1];

  return (
    <section className="px-6 py-16">
      <ScrollReveal>
        <h1 className="font-display text-4xl mb-2">{region}</h1>
        <p className="text-parchment/60 mb-12 font-mono text-sm">
          {recipes.length} dish{recipes.length === 1 ? "" : "es"} from this
          region
        </p>
      </ScrollReveal>

      <div className="bg-corkboard bg-parchment/5 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {recipes.map((recipe: any, i: number) => (
          <ScrollReveal key={recipe._id} delay={(i % 6) * 80}>
            <RecipeCard
              title={recipe.title}
              slug={recipe.slug}
              country={recipe.country}
              totalTimeMinutes={recipe.totalTimeMinutes}
              mainImage={recipe.mainImage}
              excerpt={recipe.excerpt}
              rotate={rotations[i % rotations.length]}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
