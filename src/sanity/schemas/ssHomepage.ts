import { defineField, defineType } from "sanity";
import { ssRichBlock } from "./ssRichBlock";

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
      of: [ssRichBlock],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Framside (SS)" }),
  },
});
