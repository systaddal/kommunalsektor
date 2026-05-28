import { defineField, defineType } from "sanity";

export default defineType({
  name: "ssHomepage",
  title: "Framside",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Taglinje",
      type: "string",
      description: "Liten tekst i pillen øvst",
    }),
    defineField({
      name: "body",
      title: "Brødtekst",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Framside (SS)" }),
  },
});
