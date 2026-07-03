'use client';

import { useMemo, useState } from 'react';
import RecipeCard from './RecipeCard';
import ScrollReveal from './ScrollReveal';

type Recipe = {
  _id: string;
  title: string;
  slug: string;
  country: string;
  region?: string;
  totalTimeMinutes?: number;
  mainImage?: any;
  excerpt?: string;
  ingredients?: string[];
  dietTags?: string[];
};

const TIME_OPTIONS = [
  { label: 'Any time', value: 0 },
  { label: 'Under 30 min', value: 30 },
  { label: 'Under 60 min', value: 60 },
  { label: 'Under 90 min', value: 90 },
];

export default function RecipeFilters({
  recipes,
  rotations,
}: {
  recipes: Recipe[];
  rotations: number[];
}) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [maxTime, setMaxTime] = useState(0);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const regions = useMemo(
    () =>
      Array.from(new Set(recipes.map((r) => r.region).filter(Boolean))).sort() as string[],
    [recipes]
  );

  const dietTags = useMemo(
    () =>
      Array.from(new Set(recipes.flatMap((r) => r.dietTags || []))).sort(),
    [recipes]
  );

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recipes.filter((r) => {
      if (q) {
        const haystack = [r.title, r.country, ...(r.ingredients || [])]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (region && r.region !== region) return false;
      if (maxTime && (!r.totalTimeMinutes || r.totalTimeMinutes > maxTime))
        return false;
      if (
        activeTags.length > 0 &&
        !activeTags.some((tag) => (r.dietTags || []).includes(tag))
      )
        return false;
      return true;
    });
  }, [recipes, search, region, maxTime, activeTags]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10 bg-parchment/5 border border-parchment/15 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, country, or ingredient..."
            className="flex-1 rounded-full bg-transparent border border-parchment/20 px-4 py-2 text-sm text-parchment placeholder:text-parchment/40 outline-none focus:border-gold"
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full bg-ink border border-parchment/20 px-4 py-2 text-sm text-parchment outline-none focus:border-gold"
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            className="rounded-full bg-ink border border-parchment/20 px-4 py-2 text-sm text-parchment outline-none focus:border-gold"
          >
            {TIME_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {dietTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dietTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`font-mono text-[11px] uppercase tracking-wider rounded-full border px-3 py-1 transition-colors ${
                  activeTags.includes(tag)
                    ? 'bg-gold text-ink border-gold'
                    : 'border-parchment/25 text-parchment/60 hover:border-gold hover:text-gold'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="font-mono text-xs text-parchment/50 mb-6">
        {filtered.length} dish{filtered.length === 1 ? '' : 'es'} match
        {filtered.length === 1 ? 'es' : ''}
      </p>

      {filtered.length === 0 ? (
        <p className="text-parchment/60 font-mono text-sm">
          No recipes match those filters — try widening your search.
        </p>
      ) : (
        <div className="bg-corkboard bg-parchment/5 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {filtered.map((recipe, i) => (
            <ScrollReveal key={recipe._id} delay={(i % 6) * 80}>
              <RecipeCard
                title={recipe.title}
                slug={recipe.slug}
                country={recipe.country}
                totalTimeMinutes={recipe.totalTimeMinutes}
                mainImage={recipe.mainImage}
                excerpt={recipe.excerpt}
                dietTags={recipe.dietTags}
                rotate={rotations[i % rotations.length]}
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
