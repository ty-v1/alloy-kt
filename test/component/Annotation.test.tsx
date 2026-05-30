import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Annotation, Annotations } from "../../src/component/Annotation.js";

describe("Annotation", () => {
  it("renders a simple annotation with no args", () => {
    const res = renderToString(<Annotation type="Override" />);

    expect(res).toBe("@Override");
  });

  it("renders an annotation with a single positional arg", () => {
    const res = renderToString(<Annotation type="SuppressWarnings" value={{ value: '"unchecked"' }} />);

    expect(res).toBe('@SuppressWarnings("unchecked")');
  });

  it("renders an annotation with multiple positional args", () => {
    const res = renderToString(
      <Annotation type="Suppress" value={{ value: ['"UNUSED_PARAMETER"', '"UNUSED_VARIABLE"'] }} />,
    );

    expect(res).toBe('@Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")');
  });

  it("renders an annotation with a named arg", () => {
    const res = renderToString(<Annotation type="Anno" value={{ name: '"value"' }} />);

    expect(res).toBe('@Anno(name = "value")');
  });

  it("renders an annotation with multiple named args", () => {
    const res = renderToString(<Annotation type="Anno" value={{ x: '"a"', y: '"b"' }} />);

    expect(res).toBe('@Anno(x = "a", y = "b")');
  });

  it("renders an annotation with use-site target and no args", () => {
    const res = renderToString(<Annotation type="JvmField" target="field" />);

    expect(res).toBe("@field:JvmField");
  });

  it("renders an annotation with use-site target and args", () => {
    const res = renderToString(<Annotation type="Anno" target="get" value={{ value: '"value"' }} />);

    expect(res).toBe('@get:Anno("value")');
  });

  it("renders an Annotations with multiple annotations", () => {
    const res = renderToString(
      <Annotations
        annotations={[{ type: "Override" }, { type: "SuppressWarnings", value: { value: '"unchecked"' } }]}
      />,
    );

    expect(res).toBe(d`
      @Override
      @SuppressWarnings("unchecked")
    `);
  });
});
