import { defineArrayMember } from "sanity";

// Delt rich-text-blokk for Selseng & Systaddal.
// Gir redaktørane halvfeit, kursiv, overskrifter, lister og lenker.
export const ssRichBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Tittel", value: "h1" },
    { title: "Overskrift", value: "h2" },
    { title: "Underoverskrift", value: "h3" },
    { title: "Sitat", value: "blockquote" },
  ],
  lists: [
    { title: "Punktliste", value: "bullet" },
    { title: "Nummerert liste", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Halvfeit", value: "strong" },
      { title: "Kursiv", value: "em" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Lenke",
        fields: [{ name: "href", type: "url", title: "URL" }],
      },
    ],
  },
});
