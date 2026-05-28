import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

function structure(S: StructureBuilder) {
  return S.list()
    .title("Innhald")
    .items([
      S.listItem()
        .title("KommunalSektor")
        .child(
          S.list()
            .title("KommunalSektor")
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
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Selseng & Systaddal")
        .child(
          S.list()
            .title("Selseng & Systaddal")
            .items([
              S.listItem()
                .title("Framside")
                .child(S.document().schemaType("ssHomepage").documentId("ssHomepage")),
              S.listItem()
                .title("Folka")
                .child(S.document().schemaType("ssFolkPage").documentId("ssFolkPage")),
            ]),
        ),
    ]);
}

export default defineConfig({
  name: "kommunalsektor",
  title: "Kommunalsektor",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
