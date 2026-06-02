import { defineField, defineType, defineArrayMember } from "sanity";
import { ssRichBlock } from "./ssRichBlock";

export default defineType({
  name: "ssFolkPage",
  title: "Folka",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Taglinje",
      type: "string",
      description: "Liten tekst i pillen øvst",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [ssRichBlock],
    }),
    defineField({
      name: "people",
      title: "Personar",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Namn", type: "string" }),
            defineField({
              name: "image",
              title: "Bilde",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "array",
              of: [ssRichBlock],
            }),
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Folka (SS)" }),
  },
});
