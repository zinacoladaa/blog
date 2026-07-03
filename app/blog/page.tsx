import { client, allPostsQuery, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery).catch(() => []);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <ScrollReveal>
        <h1 className="font-display text-4xl mb-2">Stories from the Kitchen</h1>
        <p className="text-parchment/60 mb-12 font-mono text-sm">
          Notes, techniques, and travel dispatches behind the recipes.
        </p>
      </ScrollReveal>

      {posts.length === 0 ? (
        <p className="text-parchment/60 font-mono text-sm">
          Nothing here yet — add a post in the{" "}
          <a href="/studio" className="underline text-gold">
            Studio
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.map((post: any, i: number) => (
            <ScrollReveal key={post._id} delay={(i % 4) * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-lg overflow-hidden border border-parchment/15 hover:border-gold transition-colors"
              >
                {post.mainImage ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).width(700).height(394).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] bg-parchment/5" />
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(post.categories || []).map((cat: string) => (
                      <span
                        key={cat}
                        className="font-mono text-[10px] uppercase tracking-widest text-gold/80"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-parchment/70 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="font-mono text-[11px] text-parchment/50">
                    {post.author ? `${post.author} · ` : ""}
                    {post.publishedAt &&
                      new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
