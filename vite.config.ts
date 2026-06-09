import alloyPlugin from "@alloy-js/rollup-plugin";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  oxc: {
    jsx: "preserve",
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["remeda", /^@alloy-js\/.*/],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
    alloyPlugin(),
  ],
});
