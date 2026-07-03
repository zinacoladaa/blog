import { client, recipeBySlugQuery, relatedRecipesQuery, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollReveal from "../../components/ScrollReveal";
import RecipeCard from "../../components/RecipeCard";

export const revalidate = 60;

type Props = { params: { slug: string } };

export default async function RecipePage({ params }: Props) {
  const recipe = await client
    .fetch(recipeBySlugQuery, { slug: params.slug })
    .catch(() => null);

  if (!recipe) notFound();

  const related = await client
    .fetch(relatedRecipesQuery, { region: recipe.region, slug: recipe.slug })
    .catch(() => []);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: recipe.mainImage ? [urlFor(recipe.mainImage).url()] : undefined,
    description: recipe.excerpt,
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    prepTime: recipe.prepTimeMinutes ? `PT${recipe.prepTimeMinutes}M` : undefined,
    cookTime: recipe.cookTimeMinutes ? `PT${recipe.cookTimeMinutes}M` : undefined,
    totalTime: recipe.totalTimeMinutes ? `PT${recipe.totalTimeMinutes}M` : undefined,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: (recipe.steps || []).map((step: string) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <>
    <article className="px-6 py-16 max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollReveal>
        <span className="postmark inline-block px-3 py-1 text-xs mb-6">
          {recipe.country}
        </span>

        <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
          {recipe.title}
        </h1>
      </ScrollReveal>

      {recipe.mainImage && (
        <ScrollReveal>
          <div className="relative w-full aspect-[3/2] mb-8 rounded overflow-hidden">
            <Image
              src={urlFor(recipe.mainImage).width(900).height(600).url()}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      )}

      <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-parchment/60 mb-10">
        {recipe.prepTimeMinutes && <span>Prep {recipe.prepTimeMinutes}m</span>}
        {recipe.cookTimeMinutes && <span>Cook {recipe.cookTimeMinutes}m</span>}
        {recipe.servings && <span>Serves {recipe.servings}</span>}
      </div>

      {recipe.story && (
        <ScrollReveal>
          <p className="text-parchment/80 leading-relaxed mb-12 whitespace-pre-line">
            {recipe.story}
          </p>
        </ScrollReveal>
      )}

      {recipe.ingredients?.length > 0 && (
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">Ingredients</h2>
            <ul className="space-y-2 font-mono text-sm text-parchment/80">
              {recipe.ingredients.map((ing: string, i: number) => (
                <li key={i} className="border-b border-parchment/10 pb-2">
                  {ing}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {recipe.steps?.length > 0 && (
        <ScrollReveal>
          <section className="mb-12">
            <h2 className="font-display text-2xl mb-4">Method</h2>
            <ol className="space-y-5">
              {recipe.steps.map((step: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="postmark shrink-0 w-8 h-8 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <p className="text-parchment/80 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </ScrollReveal>
      )}

      {recipe.tips && (
        <ScrollReveal>
          <section className="border-t border-parchment/20 pt-8">
            <h2 className="font-display text-xl mb-3">Tips &amp; variations</h2>
            <p className="text-parchment/70 leading-relaxed whitespace-pre-line">
              {recipe.tips}
            </p>
          </section>
        </ScrollReveal>
      )}
    </article>

    {related.length > 0 && (
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-parchment/50 mb-8 text-center">
            More from {recipe.region}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-items-center">
          {related.map((r: any, i: number) => (
            <ScrollReveal key={r._id} delay={i * 80}>
              <RecipeCard
                title={r.title}
                slug={r.slug}
                country={r.country}
                totalTimeMinutes={r.totalTimeMinutes}
                mainImage={r.mainImage}
                excerpt={r.excerpt}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    )}
    </>
  );
}
