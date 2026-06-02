import type { PortableTextComponents } from "@portabletext/react";

// Render-komponentar for Selseng & Systaddal sin brødtekst.
// Gir overskrifter, lister, halvfeit og lenker rett uttrykk i SS sin minimale stil.
export const ssPortableText: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-medium text-[#111] tracking-tight leading-tight mt-12 first:mt-0 mb-5">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-medium text-[#111] tracking-tight leading-snug mt-12 first:mt-0 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium text-[#111] tracking-tight mt-8 first:mt-0 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#ddd] pl-5 my-7 text-[#666]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-7 marker:text-[#bbb]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-7 marker:text-[#bbb]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-[#111]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#111] underline underline-offset-2 hover:text-[#444] transition-colors"
      >
        {children}
      </a>
    ),
  },
};
