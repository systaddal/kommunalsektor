import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

function kommunalSektorStructure(S: StructureBuilder) {
  return S.list()
    .title("Innhald")
    .items([
      S.listItem()
        .title("Framside")
        .child(S.document().schemaType("frontpage").documentId("frontpage")),
      S.listItem()
        .title("Om oss")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.documentTypeListItem("project").title("Prosjekt"),
      S.documentTypeListItem("page").title("Sider"),
      S.documentTypeListItem("post").title("Artiklar"),
    ]);
}

function ssStructure(S: StructureBuilder) {
  return S.list()
    .title("Innhald")
    .items([
      S.listItem()
        .title("Framside")
        .child(
          S.document()
            .schemaType("ssHomepage")
            .documentId("c82af4f4-74ed-4b00-8349-81af4e7e8eeb"),
        ),
      S.listItem()
        .title("Folka")
        .child(
          S.document()
            .schemaType("ssFolkPage")
            .documentId("fe9bc38a-3ffb-4fde-a381-53fc3c32c843"),
        ),
    ]);
}

const shared = { projectId, dataset };

export default defineConfig([
  {
    ...shared,
    name: "kommunalsektor",
    title: "KommunalSektor",
    basePath: "/studio/kommunalsektor",
    plugins: [structureTool({ structure: kommunalSektorStructure }), visionTool()],
    schema: { types: schemaTypes },
  },
  {
    ...shared,
    name: "selsengsystaddal",
    title: "Selseng & Systaddal",
    basePath: "/studio/selsengsystaddal",
    plugins: [structureTool({ structure: ssStructure }), visionTool()],
    schema: { types: schemaTypes },
  },
]);
