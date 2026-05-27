import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Lambda } from "../../src/component/Lambda.js";

describe("Lambda", () => {
  it("renders a no-parameter lambda with body", () => {
    const res = renderToString(<Lambda>println("hello")</Lambda>);

    expect(res).toBe('{\n  println("hello")\n}');
  });

  it("renders a single typed parameter", () => {
    const res = renderToString(<Lambda parameters={{ x: "Int" }}>x * 2</Lambda>);

    expect(res).toBe("{\n  x: Int -> x * 2\n}");
  });

  it("renders multiple typed parameters", () => {
    const res = renderToString(
      <Lambda parameters={{ a: "Int", b: "Int" }}>a + b</Lambda>,
    );

    expect(res).toBe("{\n  a: Int, b: Int -> a + b\n}");
  });

  it("renders parameters without type annotations", () => {
    const res = renderToString(
      <Lambda parameters={{ a: undefined, b: undefined }}>a + b</Lambda>,
    );

    expect(res).toBe("{\n  a, b -> a + b\n}");
  });

  it("renders mixed typed and untyped parameters", () => {
    const res = renderToString(
      <Lambda parameters={{ a: "Int", b: undefined }}>a + b</Lambda>,
    );

    expect(res).toBe("{\n  a: Int, b -> a + b\n}");
  });

  it("renders a multiline lambda body", () => {
    const res = renderToString(
      <Lambda parameters={{ x: "Int" }}>
        {"val doubled = x * 2\ndoubled + 1"}
      </Lambda>,
    );

    expect(res).toBe("{\n  x: Int -> val doubled = x * 2\n  doubled + 1\n}");
  });

  it("renders an empty lambda", () => {
    const res = renderToString(<Lambda />);

    expect(res).toBe("{}");
  });
});
