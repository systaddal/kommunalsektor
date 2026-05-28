import { defineField, defineType, defineArrayMember } from "sanity";

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
      of: [{ type: "block" }],
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
              name: "bio",
              title: "Bio",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: { select: { title: "name" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Folka (SS)" }),
  },
});
