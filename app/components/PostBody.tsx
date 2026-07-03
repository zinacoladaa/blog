import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <span className="relative my-8 block aspect-[3/2] w-full overflow-hidden rounded">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </span>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-lg mt-8 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-4 italic text-parchment/70 my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-parchment/80 leading-relaxed mb-5">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-5 text-parchment/80">
        {children}
      </ul>
    ),
  },
};

export default function PostBody({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />;
}
