import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { TypeParameters } from "../../src/component/TypeParameters.js";

describe("TypeParameters", () => {
  it("renders a single unconstrained type parameter", () => {
    const res = renderToString(<TypeParameters generics={{ T: undefined }} />);

    expect(res).toBe("<T>");
  });

  it("renders a type parameter with a bound using colon syntax", () => {
    const res = renderToString(<TypeParameters generics={{ T: "Comparable<T>" }} />);

    expect(res).toBe("<T : Comparable<T>>");
  });

  it("renders multiple type parameters", () => {
    const res = renderToString(<TypeParameters generics={{ K: undefined, V: "Any" }} />);

    expect(res).toBe("<K, V : Any>");
  });
});
