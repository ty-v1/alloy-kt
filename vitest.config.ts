import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
    exclude: ["test/**/*.d.ts"],
    globals: true,
  },
  esbuild: {
    // @ts-expect-error it seems to need
    jsx: "preserve",
    sourcemap: "both",
  },
  plugins: [alloyPlugin()],
});
