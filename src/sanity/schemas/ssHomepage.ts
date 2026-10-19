import { defineField, defineType } from "sanity";
import { ssRichBlock } from "./ssRichBlock";

// Framsida til selsengsystaddal.no. Tre bolkar:
// 1) Kva me jobbar med + effektane + kontakt, 2) Substack, 3) Folka.
// Den gamle brødteksten ligg i dokumenttypen «Arkiv».
export default defineType({
  name: "ssHomepage",
  title: "Framside",
  type: "document",
  groups: [
    { name: "topp", title: "Toppen" },
    { name: "bolk1", title: "1 · Utviklingskapasitet" },
    { name: "bolk2", title: "2 · Substack" },
    { name: "bolk3", title: "3 · Folka" },
    { name: "arkiv", title: "Arkiv" },
  ],
  fields: [
    // ── Toppen ──────────────────────────────────────────────
    defineField({
      name: "heroVenstre",
      title: "Første ord",
      type: "string",
      group: "topp",
      description: "Setninga vender annakvar gong. «Folk formar system» blir «System formar folk».",
      initialValue: "folk",
    }),
    defineField({
      name: "heroVerb",
      title: "Verb",
      type: "string",
      group: "topp",
      description: "Ordet som står stille i midten",
      initialValue: "formar",
    }),
    defineField({
      name: "heroHogre",
      title: "Andre ord",
      type: "string",
      group: "topp",
      initialValue: "system",
    }),
    defineField({
      name: "tagline",
      title: "Taglinje",
      type: "string",
      group: "topp",
      description: "Setninga i kursiv under overskrifta",
    }),

    // ── Bolk 1 ──────────────────────────────────────────────
    defineField({
      name: "bolk1Tittel",
      title: "Overskrift",
      type: "string",
      group: "bolk1",
    }),
    defineField({
      name: "bolk1Ingress",
      title: "Ingress",
      type: "array",
      of: [ssRichBlock],
      group: "bolk1",
      description: "Marker ord med halvfeit der du vil ha trykk.",
    }),
    defineField({
      name: "temaTittel",
      title: "Merkelapp over temakorta",
      type: "string",
      group: "bolk1",
      initialValue: "Me jobbar med",
    }),
    defineField({
      name: "kjerneTittel",
      title: "Kjernen i midten",
      type: "string",
      group: "bolk1",
      description:
        "Står i midten av krysset, mellom dei fire delane. Ikkje ei lenkje.",
      initialValue: "Trua på folk",
    }),
    defineField({
      name: "kjerneTekst",
      title: "Kjernen: undertekst",
      type: "text",
      rows: 3,
      group: "bolk1",
    }),
    defineField({
      name: "effektTittel",
      title: "Merkelapp over effektane",
      type: "string",
      group: "bolk1",
      initialValue: "Effektane me jobbar for",
    }),
    defineField({
      name: "effektar",
      title: "Effektar",
      type: "array",
      of: [{ type: "string" }],
      group: "bolk1",
      options: { layout: "tags" },
    }),
    defineField({
      name: "effektKort",
      title: "Effektane med forklaring",
      type: "array",
      group: "bolk1",
      description:
        "Dei fem effektane, i fast rekkjefølgje. Står øvst, rett under ingressen. Erstattar lista «Effektar» når ho er fylt ut.",
      of: [
        {
          type: "object",
          name: "effektKortItem",
          fields: [
            { name: "tittel", title: "Effekt", type: "string" },
            { name: "tekst", title: "Kva det betyr i kvardagen", type: "text", rows: 3 },
          ],
          preview: { select: { title: "tittel", subtitle: "tekst" } },
        },
      ],
    }),
    defineField({
      name: "omradeTittel",
      title: "Merkelapp over områda",
      type: "string",
      group: "bolk1",
      description: "Områda står diskret under effektane, som referanse.",
      initialValue: "For deg som vil etterprøve oss",
    }),
    defineField({
      name: "omradeIngress",
      title: "Ingress over områda",
      type: "text",
      rows: 2,
      group: "bolk1",
    }),
    defineField({
      name: "ctaTekst",
      title: "Tekst på knappen",
      type: "string",
      group: "bolk1",
      initialValue: "Kontakt oss",
    }),

    // ── Bolk 2 ──────────────────────────────────────────────
    defineField({
      name: "substackTittel",
      title: "Overskrift",
      type: "string",
      group: "bolk2",
    }),
    defineField({
      name: "substackIngress",
      title: "Ingress",
      type: "text",
      rows: 2,
      group: "bolk2",
    }),
    defineField({
      name: "substackUrl",
      title: "Adresse til Substack",
      type: "url",
      group: "bolk2",
      description: "Innlegga blir henta automatisk frå RSS-feeden til denne adressa.",
    }),
    defineField({
      name: "substackLenketekst",
      title: "Tekst på lenkja",
      type: "string",
      group: "bolk2",
      initialValue: "Les alt på Substack",
    }),
    defineField({
      name: "substackTal",
      title: "Tal innlegg",
      type: "number",
      group: "bolk2",
      initialValue: 3,
      validation: (r) => r.min(1).max(6),
    }),

    // ── Bolk 3 ──────────────────────────────────────────────
    defineField({
      name: "folkaTittel",
      title: "Overskrift",
      type: "string",
      group: "bolk3",
    }),
    defineField({
      name: "folkaIngress",
      title: "Ingress",
      type: "text",
      rows: 3,
      group: "bolk3",
    }),
    defineField({
      name: "folkaLenketekst",
      title: "Tekst på lenkja",
      type: "string",
      group: "bolk3",
      initialValue: "Meir om folka",
    }),

    // ── Arkiv ───────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Gammal framsidetekst",
      type: "array",
      of: [ssRichBlock],
      group: "arkiv",
      description:
        "Framsideteksten slik han stod fram til 3. september 2026. Blir ikkje vist på nettsida — han ligg her så me har han.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Framside (SS)" }),
  },
});
