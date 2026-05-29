import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { TypeParameters } from "../../src/component/TypeParameters.js";

describe("TypeParameters", () => {
  it("renders a single unconstrained type parameter", () => {
    const res = renderToString(<TypeParameters generics={{ T: undefined }} />);

    expect(res).toBe("<T>");
  });

  it("renders a type parameter with a bound", () => {
    const res = renderToString(<TypeParameters generics={{ T: { upperBound: "Comparable<T>" } }} />);

    expect(res).toBe("<T : Comparable<T>>");
  });

  it("renders multiple type parameters", () => {
    const res = renderToString(<TypeParameters generics={{ K: undefined, V: { upperBound: "Any" } }} />);

    expect(res).toBe("<K, V : Any>");
  });

  it("renders a single type parameter with out variance", () => {
    const res = renderToString(<TypeParameters generics={{ T: { variance: "out" } }} />);

    expect(res).toBe("<out T>");
  });

  it("renders a single type parameter with in variance", () => {
    const res = renderToString(<TypeParameters generics={{ T: { variance: "in" } }} />);

    expect(res).toBe("<in T>");
  });

  it("renders variance with upper bound", () => {
    const res = renderToString(<TypeParameters generics={{ T: { variance: "out", upperBound: "Any" } }} />);

    expect(res).toBe("<out T : Any>");
  });

  it("renders reified modifier", () => {
    const res = renderToString(<TypeParameters generics={{ T: { reified: true } }} />);

    expect(res).toBe("<reified T>");
  });

  it("renders mixed: one with variance, one without", () => {
    const res = renderToString(<TypeParameters generics={{ T: { variance: "out" }, R: undefined }} />);

    expect(res).toBe("<out T, R>");
  });
});
