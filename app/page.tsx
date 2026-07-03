import { client, allRecipesQuery } from "@/lib/sanity";
import RecipeCard from "./components/RecipeCard";
import ScrollReveal from "./components/ScrollReveal";
import HeroImageSlideshow from "./components/HeroImageSlideshow";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-colors ${
        isPrimary
          ? "bg-[#7a1f2b] text-white hover:bg-[#5a1620]"
          : "border-2 border-[#1b6b4a] text-[#1b6b4a] hover:bg-[#1b6b4a] hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function HomePage() {
  const recipes = await client.fetch(allRecipesQuery).catch(() => []);
  const featured = recipes.slice(0, 6);

  const rotations = [-3, 2, -1.5, 3, -2.5, 1.5];

  return (
    <main className="min-h-screen bg-[#fff6e5] text-[#3a2e1f] relative">
      <div className="absolute top-8 right-8 z-20 pointer-events-none" style={{ transform: "rotate(-15deg)" }}>
        <Image
          src="/images/stamp.png"
          alt="Travel approved passport stamp"
          width={170}
          height={170}
          priority
        />
      </div>
      {/* Hero */}
      <section className="px-6 pt-20 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <span className="inline-block rounded-full border-2 border-[#1b6b4a] bg-[#1b6b4a]/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-[#1b6b4a] font-semibold">
              Est. This Year
            </span>

            <h1 className="mt-8 font-display text-5xl md:text-6xl leading-tight text-[#7a1f2b]">
              Comfort food,
              <br />
              from every corner of Asia.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3a2e1f]/80">
              Explore authentic recipes from across Asia. Comfort food, street food, and family recipes collected from every kitchen table, with flavors that feel like a warm welcome.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Button href="/recipes" variant="primary">
                Explore Recipes
              </Button>
              <Button href="/regions" variant="secondary">
                Browse by Region
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <HeroImageSlideshow />
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#1b6b4a] font-semibold">
              Fresh from the kitchen
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[#7a1f2b]">
              A few dishes to tempt your appetite
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              image:
                "https://res.cloudinary.com/dky6bti4g/image/upload/v1783108981/selection-of-asian-food-spring-roll-samosa-dump-2026-01-09-14-57-40-utc_1_omguy7.jpg",
              title: "A vibrant taste of Asia",
              text: "A colorful mix of bites, wraps, and comfort favorites from across Asia.",
            },
            {
              image:
                "https://res.cloudinary.com/dky6bti4g/image/upload/v1783109266/assortment-of-colorful-spices-in-wooden-bowls-2026-03-09-02-53-15-utc_1_xgwzhv.jpg",
              title: "Spice-rich Desi favorites",
              text: "Warm herbs, bold blends, and the kind of flavor that lingers.",
            },
            {
              image:
                "https://res.cloudinary.com/dky6bti4g/image/upload/v1783110406/smiling-family-sharing-food-at-indoor-table-2026-03-24-04-00-34-utc_2_p07uoi.jpg",
              title: "Family sharing plates",
              text: "Warm, generous dishes made for gathering around the table.",
            },
          ].map((dish, index) => (
            <ScrollReveal key={dish.title} delay={index * 100}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-2 border-[#e8b84b] bg-white shadow-lg">
                <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
                  <div className="steam-bubble steam-one" />
                  <div className="steam-bubble steam-two" />
                  <div className="steam-bubble steam-three" />
                </div>
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl text-[#7a1f2b]">{dish.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3a2e1f]/70">{dish.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Global Regions Showcase */}
      <section className="px-6 py-20 bg-[#f5ede4] border-y-4 border-[#1b6b4a]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#1b6b4a] font-semibold mb-12 text-center">
              Culinary Journey Across Asia
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783107121/kurdistan_owzhk5.png",
                name: "Kurdistan",
                desc: "Rich & Hearty",
              },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783107119/indonesia_yqjzrl.png",
                name: "Indonesia",
                desc: "Spiced & Bold",
              },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783113331/china-flag_vufegj.png",
                name: "China",
                desc: "Ancient & Balanced",
              },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783113428/turkey-flag_w9be5d.png",
                name: "Turkey",
                desc: "Savory & Layered",
              },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783107119/india_gzvmsy.png",
                name: "India",
                desc: "Warm & Aromatic",
              },
              { flag: "pakistan.jpg", name: "Pakistan", desc: "Vibrant & Robust" },
              { flag: "lebanon.jpg", name: "Lebanon", desc: "Fresh & Mediterranean" },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783113348/morocco-flag_uvhfdt.png",
                name: "Morocco",
                desc: "Exotic & Sweet",
              },
              {
                flag: "https://res.cloudinary.com/dky6bti4g/image/upload/v1783114214/japan-flag_scbik6.png",
                name: "Japan",
                desc: "Delicate & Umami",
              },
            ].map((region, index) => (
              <ScrollReveal key={region.name} delay={index * 80}>
                <Link
                  href={`/regions/${region.name.toLowerCase()}`}
                  className="group relative block p-6 bg-white rounded-lg border-2 border-[#e8b84b] hover:shadow-lg hover:border-[#7a1f2b] transition text-center"
                >
                  <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
                    <div className="steam-bubble steam-one" />
                    <div className="steam-bubble steam-two" />
                    <div className="steam-bubble steam-three" />
                  </div>
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={region.flag.startsWith("http") ? region.flag : `/images/countryicons/${region.flag}`}
                      alt={`${region.name} flag`}
                      width={100}
                      height={60}
                      className="rounded"
                    />
                  </div>
                  <h3 className="font-display text-lg text-[#7a1f2b] group-hover:underline">
                    {region.name}
                  </h3>
                  <p className="text-sm text-[#3a2e1f]/60 mt-2">{region.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="mb-8 text-sm uppercase tracking-[0.3em] text-[#1b6b4a] font-semibold">
            Pinned to the Passport
          </h2>
        </ScrollReveal>

        {featured.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-[#e8b84b] bg-white/60 p-8">
            <p className="text-[#3a2e1f]/70">
              No recipes yet — add your first one in the Studio at{" "}
              <a
                href="/studio"
                className="font-semibold text-[#7a1f2b] underline"
              >
                /studio
              </a>
              .
            </p>
          </div>
        ) : (
          <ScrollReveal>
            <div className="rounded-2xl border-4 border-[#e8b84b] bg-[#fdf3df] p-10 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
                {featured.map((recipe: any, i: number) => (
                  <RecipeCard
                    key={recipe._id}
                    title={recipe.title}
                    slug={recipe.slug}
                    country={recipe.country}
                    totalTimeMinutes={recipe.totalTimeMinutes}
                    mainImage={recipe.mainImage}
                    excerpt={recipe.excerpt}
                    rotate={rotations[i % rotations.length]}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="text-center mt-12">
          <Button href="/recipes" variant="primary">
            View All Recipes
          </Button>
        </ScrollReveal>
      </section>


      <section className="px-6 py-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="rounded-[2rem] border-4 border-[#1b6b4a] bg-[#fdf3df] p-8 md:p-10 shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.3em] text-[#1b6b4a] font-semibold">
                  Stay in the loop
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl text-[#7a1f2b]">
                  Get cozy recipes and stories in your inbox.
                </h2>
                <p className="mt-3 text-lg text-[#3a2e1f]/80">
                  Join the list for weekly flavor inspiration, kitchen notes, and new dishes from around the world.
                </p>
              </div>

              <form className="w-full max-w-md rounded-full bg-white p-2 shadow-sm ring-1 ring-[#e8b84b] flex flex-col sm:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-transparent bg-transparent px-4 py-3 text-[#3a2e1f] outline-none placeholder:text-[#3a2e1f]/50"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#7a1f2b] px-5 py-3 font-semibold text-white transition hover:bg-[#5a1620]"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-[#7a1f2b] mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-[#3a2e1f]/80 mb-8 max-w-2xl mx-auto">
            Start your culinary adventure across Asia. Discover recipes, stories, and the flavors that bring the region to life.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}