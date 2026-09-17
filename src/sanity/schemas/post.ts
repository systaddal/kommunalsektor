import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Artikkel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Samandrag",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Innhald",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "tags",
      title: "Emneord",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
    }),
    defineField({
      name: "podcastEpisode",
      title: "Podcastepisode",
      type: "string",
      description:
        "Valfritt. Lim inn tittelen på episoden slik han står i Samfunnsoppdraget-feeden (t.d. «Andreas Wettre - Å leie det du ikkje kan styre»). Då får artikkelen ein avspelar og lenkjer til Spotify og Apple.",
    }),
    defineField({
      name: "episodeSpotifyUrl",
      title: "Spotify-lenke til episoden",
      type: "url",
      description: "Valfritt. Står han tom, peikar knappen til podcasten på Spotify.",
      hidden: ({ document }) => !document?.podcastEpisode,
    }),
    defineField({
      name: "episodeAppleUrl",
      title: "Apple Podcasts-lenke til episoden",
      type: "url",
      description: "Valfritt. Står han tom, blir episodelenkja henta automatisk frå Apple.",
      hidden: ({ document }) => !document?.podcastEpisode,
    }),
    defineField({
      name: "image",
      title: "Bilete",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Publiseringsdato, nyaste fyrst",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      date: "publishedAt",
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date
          ? new Date(date).toLocaleDateString("nn-NO")
          : "Ikkje publisert",
      };
    },
  },
});
