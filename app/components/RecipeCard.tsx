import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

type RecipeCardProps = {
  title: string;
  slug: string;
  country: string;
  totalTimeMinutes?: number;
  mainImage?: any;
  excerpt?: string;
  rotate?: number;
  dietTags?: string[];
};

export default function RecipeCard({
  title,
  slug,
  country,
  totalTimeMinutes,
  mainImage,
  excerpt,
  rotate = 0,
  dietTags,
}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${slug}`}
      className="postcard relative block p-4 pt-6 w-full max-w-xs"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="pin" aria-hidden="true" />
      {mainImage ? (
        <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden">
          <Image
            src={urlFor(mainImage).width(400).height(300).url()}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] mb-3 bg-charcoal/10" />
      )}
      <span className="postmark inline-block px-3 py-1 text-[10px] mb-2">
        {country}
      </span>
      <h3 className="font-display text-lg leading-snug mb-1">{title}</h3>
      {excerpt && (
        <p className="text-sm text-charcoal/70 line-clamp-2">{excerpt}</p>
      )}
      {dietTags && dietTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {dietTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-wider rounded-full border border-charcoal/20 px-2 py-0.5 text-charcoal/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {totalTimeMinutes && (
        <p className="font-mono text-[11px] mt-2 text-charcoal/50">
          {totalTimeMinutes} min
        </p>
      )}
    </Link>
  );
}
