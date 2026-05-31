import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

export default defineConfig({
  site: "https://ty-v1.github.io",
  base: "/alloy-kt",
  integrations: [
    starlight({
      title: "alloy-kt",
      plugins: [
        starlightTypeDoc({
          entryPoints: [
            "../src/component/index.ts",
            "../src/context/index.ts",
            "../src/scope/index.ts",
            "../src/symbol/index.ts",
          ],
          tsconfig: "../tsconfig.json",
        }),
      ],
      sidebar: [{ label: "Getting Started", slug: "guides/getting-started" }, typeDocSidebarGroup],
    }),
  ],
});
