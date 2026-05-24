import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Value } from "../../src/component/Value.js";

describe("Value", () => {
  it("renders a string with double quotes", () => {
    expect(renderToString(<Value value="hello" />)).toBe('"hello"');
  });

  it("escapes special characters in strings", () => {
    expect(renderToString(<Value value={'a "b" \\ $c'} />)).toBe('"a \\"b\\" \\\\ \\$c"');
  });

  it("renders a number", () => {
    expect(renderToString(<Value value={123} />)).toBe("123");
  });

  it("renders a boolean", () => {
    expect(renderToString(<Value value={true} />)).toBe("true");
  });

  it("renders a bigint as a Long literal", () => {
    expect(renderToString(<Value value={9999999999n} />)).toBe("9999999999L");
  });

  it("renders null and undefined as null", () => {
    expect(renderToString(<Value value={null} />)).toBe("null");
    expect(renderToString(<Value value={undefined} />)).toBe("null");
  });
});
