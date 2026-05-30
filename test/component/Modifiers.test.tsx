import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Modifiers } from "../../src/component/Modifiers.js";

describe("Modifiers", () => {
  it("renders nothing when no modifiers are set", () => {
    const res = renderToString(<Modifiers />);

    expect(res).toBe("");
  });

  it("renders a single visibility modifier", () => {
    const res = renderToString(<Modifiers public />);

    expect(res).toBe("public ");
  });

  it("renders internal modifier", () => {
    const res = renderToString(<Modifiers internal />);

    expect(res).toBe("internal ");
  });

  it("renders data modifier", () => {
    const res = renderToString(<Modifiers data />);

    expect(res).toBe("data ");
  });

  it("renders multiple modifiers in canonical order", () => {
    // visibility comes before override per Kotlin coding conventions
    const res = renderToString(<Modifiers private override />);

    expect(res).toBe("private override ");
  });

  it("renders suspend and inline", () => {
    const res = renderToString(<Modifiers inline suspend />);

    expect(res).toBe("suspend inline ");
  });

  it("renders const modifier", () => {
    const res = renderToString(<Modifiers const />);

    expect(res).toBe("const ");
  });

  it("renders sealed abstract", () => {
    const res = renderToString(<Modifiers abstract sealed />);

    expect(res).toBe("abstract sealed ");
  });
});
