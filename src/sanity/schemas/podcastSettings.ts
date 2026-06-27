import { defineField, defineType } from "sanity";

export default defineType({
  name: "podcastSettings",
  title: "Podcast",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Merkelapp", type: "string", description: "Den vesle teksten over overskrifta (t.d. «Podcast»)." }),
    defineField({ name: "heading", title: "Overskrift", type: "string" }),
    defineField({ name: "intro", title: "Ingress", type: "text", rows: 3 }),
    defineField({ name: "spotifyUrl", title: "Spotify-lenke", type: "url" }),
    defineField({ name: "appleUrl", title: "Apple Podcasts-lenke", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Podcast" }) },
});
