import { client, postBySlugQuery, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollReveal from "../../components/ScrollReveal";
import PostBody from "../../components/PostBody";

export const revalidate = 60;

type Props = { params: { slug: string } };

export default async function PostPage({ params }: Props) {
  const post = await client
    .fetch(postBySlugQuery, { slug: params.slug })
    .catch(() => null);

  if (!post) notFound();

  return (
    <article className="px-6 py-16 max-w-2xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 mb-4">
          {(post.categories || []).map((cat: string) => (
            <span
              key={cat}
              className="postmark inline-block px-3 py-1 text-xs"
            >
              {cat}
            </span>
          ))}
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="font-mono text-xs uppercase tracking-widest text-parchment/50 mb-10">
          {post.author?.name ? `By ${post.author.name} · ` : ""}
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </p>
      </ScrollReveal>

      {post.mainImage && (
        <ScrollReveal>
          <div className="relative w-full aspect-[3/2] mb-10 rounded overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(900).height(600).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      )}

      {post.body && (
        <ScrollReveal>
          <PostBody value={post.body} />
        </ScrollReveal>
      )}

      {post.author?.name && (
        <ScrollReveal>
          <div className="mt-16 pt-8 border-t border-parchment/20 flex items-center gap-4">
            {post.author.image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={urlFor(post.author.image).width(96).height(96).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-display text-lg">{post.author.name}</p>
              {post.author.bio && (
                <div className="text-sm text-parchment/60">
                  <PostBody value={post.author.bio} />
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      )}
    </article>
  );
}
