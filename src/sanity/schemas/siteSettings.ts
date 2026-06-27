import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Nettstadinnstillingar",
  type: "document",
  fields: [
    defineField({ name: "footerTagline", title: "Footer — skildring", type: "text", rows: 2 }),
    defineField({ name: "footerCompany", title: "Footer — firmanamn og stad", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Nettstadinnstillingar" }) },
});
