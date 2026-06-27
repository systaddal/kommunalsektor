import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "fellesskapPage",
  title: "Fellesskap",
  type: "document",
  groups: [
    { name: "topp", title: "Topp" },
    { name: "rom", title: "Rom" },
    { name: "botn", title: "Botn" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Merkelapp", type: "string", group: "topp" }),
    defineField({ name: "heading", title: "Overskrift", type: "string", group: "topp" }),
    defineField({ name: "intro", title: "Ingress", type: "text", rows: 3, group: "topp" }),
    defineField({ name: "primaryLabel", title: "Hovudknapp — tekst", type: "string", group: "topp" }),
    defineField({ name: "primaryUrl", title: "Hovudknapp — lenke (Circle)", type: "url", group: "topp" }),
    defineField({ name: "secondaryLabel", title: "Sekundærknapp — tekst", type: "string", group: "topp" }),
    defineField({ name: "roomsHeading", title: "Rom — overskrift", type: "string", group: "rom" }),
    defineField({ name: "roomsIntro", title: "Rom — ingress", type: "text", rows: 2, group: "rom" }),
    defineField({
      name: "rooms",
      title: "Rom",
      type: "array",
      group: "rom",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "namn", title: "Namn", type: "string" }),
            defineField({ name: "tekst", title: "Beskriving", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "namn", subtitle: "tekst" } },
        }),
      ],
    }),
    defineField({ name: "bottomHeading", title: "Botn — overskrift", type: "string", group: "botn" }),
    defineField({ name: "bottomText", title: "Botn — tekst", type: "text", rows: 2, group: "botn" }),
    defineField({ name: "bottomLabel", title: "Botn — knapptekst", type: "string", group: "botn" }),
  ],
  preview: { prepare: () => ({ title: "Fellesskap" }) },
});
