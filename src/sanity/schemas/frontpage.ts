import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "frontpage",
  title: "Framside",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "kort", title: "Inngangskort" },
    { name: "framgangsmaate", title: "Framgangsmåte" },
    { name: "dome", title: "Artiklar" },
    { name: "kontakt", title: "Kontakt" },
  ],
  fields: [
    // ── HERO ──
    defineField({ name: "heroEyebrow", title: "Merkelapp over overskrifta", type: "string", group: "hero" }),
    defineField({
      name: "heroHeading",
      title: "Overskrift",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "heroSubtitle", title: "Undertekst", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryLabel", title: "Hovudknapp — tekst", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryLabel", title: "Sekundærknapp — tekst", type: "string", group: "hero" }),

    // ── INNGANGSKORT ──
    defineField({
      name: "entryCards",
      title: "Inngangskort",
      description: "Tre kort under hero. Rekkjefølgje: Artiklar, Podcast, Fellesskap.",
      type: "array",
      group: "kort",
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Tittel", type: "string" }),
            defineField({ name: "sub", title: "Undertekst", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "sub" } },
        }),
      ],
    }),

    // ── FRAMGANGSMÅTE ──
    defineField({ name: "fmHeading", title: "Overskrift", type: "string", group: "framgangsmaate" }),
    defineField({ name: "fmSubtitle", title: "Undertekst", type: "text", rows: 2, group: "framgangsmaate" }),
    defineField({
      name: "fmSteps",
      title: "Steg",
      type: "array",
      group: "framgangsmaate",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "num", title: "Nummer", type: "string" }),
            defineField({ name: "label", title: "Etikett (tab)", type: "string" }),
            defineField({ name: "title", title: "Tittel", type: "string" }),
            defineField({ name: "activities", title: "Aktivitetar", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "effects", title: "Effektar", type: "array", of: [{ type: "string" }] }),
          ],
          preview: {
            select: { num: "num", title: "title" },
            prepare: ({ num, title }) => ({ title: `${num}. ${title}` }),
          },
        }),
      ],
    }),
    defineField({ name: "fmCalloutLeftTitle", title: "Venstre boks — tittel", type: "string", group: "framgangsmaate" }),
    defineField({ name: "fmCalloutLeftItems", title: "Venstre boks — punkt", type: "array", of: [{ type: "string" }], group: "framgangsmaate" }),
    defineField({ name: "fmCalloutRightTitle", title: "Høgre boks — tittel", type: "string", group: "framgangsmaate" }),
    defineField({ name: "fmCalloutRightItems", title: "Høgre boks — punkt", type: "array", of: [{ type: "string" }], group: "framgangsmaate" }),

    // ── ARTIKLAR ──
    defineField({ name: "domeHeading", title: "Overskrift", type: "string", group: "dome" }),
    defineField({ name: "domeSubtitle", title: "Undertekst", type: "text", rows: 2, group: "dome" }),
    defineField({ name: "domeButtonLabel", title: "Knapp — tekst", type: "string", group: "dome" }),

    // ── KONTAKT ──
    defineField({ name: "kontaktHeading", title: "Overskrift", type: "string", group: "kontakt" }),
    defineField({ name: "kontaktSubtitle", title: "Undertekst", type: "text", rows: 2, group: "kontakt" }),
    defineField({ name: "kontaktEmail", title: "E-postadresse", type: "string", group: "kontakt" }),
    defineField({ name: "kontaktCompany", title: "Selskapsnamn", type: "string", group: "kontakt" }),
    defineField({ name: "kontaktPeople", title: "Personar", type: "string", group: "kontakt" }),
    defineField({ name: "kontaktLocation", title: "Stad", type: "string", group: "kontakt" }),
  ],
  preview: { prepare: () => ({ title: "Framside" }) },
});
