import { client, allRecipesQuery } from "@/lib/sanity";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

export const revalidate = 60;

export default async function RegionsPage() {
  const recipes = await client.fetch(allRecipesQuery).catch(() => []);

  const counts = new Map<string, number>();
  for (const recipe of recipes) {
    if (!recipe.region) continue;
    counts.set(recipe.region, (counts.get(recipe.region) || 0) + 1);
  }
  const regions = Array.from(counts.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <ScrollReveal>
        <h1 className="font-display text-4xl mb-2">Browse by Region</h1>
        <p className="text-parchment/60 mb-12 font-mono text-sm">
          {regions.length} region{regions.length === 1 ? "" : "s"} of recipes,
          and counting
        </p>
      </ScrollReveal>

      {regions.length === 0 ? (
        <p className="text-parchment/60 font-mono text-sm">
          Nothing here yet — add a recipe in the{" "}
          <a href="/studio" className="underline text-gold">
            Studio
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {regions.map(([region, count], i) => (
            <ScrollReveal key={region} delay={i * 60}>
              <Link
                href={`/regions/${encodeURIComponent(region)}`}
                className="group block rounded-lg border border-parchment/15 hover:border-gold p-6 transition-colors"
              >
                <h2 className="font-display text-xl mb-1 group-hover:text-gold transition-colors">
                  {region}
                </h2>
                <p className="font-mono text-xs text-parchment/50">
                  {count} dish{count === 1 ? "" : "es"}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
