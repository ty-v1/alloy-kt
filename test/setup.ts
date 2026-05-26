import matchers from "jest-extended";
import { expect } from "vitest";
import { toHaveFileContents } from "./extension/toHaveFileContents.js";

expect.extend(matchers);
expect.extend({
  toHaveFileContents,
});
