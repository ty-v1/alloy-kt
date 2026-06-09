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

describe("Named arguments", () => {
  it("renders a single named argument", () => {
    const res = renderToString(<Arguments args={[{ name: "x", value: "1" }]} />);

    expect(res).toBe("(x = 1)");
  });

  it("renders multiple named arguments", () => {
    const res = renderToString(
      <Arguments
        args={[
          { name: "x", value: "1" },
          { name: "y", value: "2" },
        ]}
      />,
    );

    expect(res).toBe("(x = 1, y = 2)");
  });

  it("renders mixed positional and named arguments", () => {
    const res = renderToString(<Arguments args={["pos", { name: "x", value: "1" }]} />);

    expect(res).toBe("(pos, x = 1)");
  });

  it("omits null elements when mixed with named arguments", () => {
    const res = renderToString(<Arguments args={[null, { name: "x", value: "1" }, undefined]} />);

    expect(res).toBe("(x = 1)");
  });
});
