import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Arguments } from "../../src/component/Arguments.js";

describe("Arguments", () => {
  it("renders empty parens when no args", () => {
    const res = renderToString(<Arguments />);

    expect(res).toBe("()");
  });

  it("renders positional arguments", () => {
    const res = renderToString(<Arguments args={["a", "b"]} />);

    expect(res).toBe("(a, b)");
  });

  it("renders a single positional argument", () => {
    const res = renderToString(<Arguments args={["42"]} />);

    expect(res).toBe("(42)");
  });

  it("omits nullable elements", () => {
    const res = renderToString(<Arguments args={["a", null, undefined, "b"]} />);

    expect(res).toBe("(a, b)");
  });
});
