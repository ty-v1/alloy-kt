import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Parameters } from "../../src/component/Parameters.js";

describe("Parameters", () => {
  it("renders empty string when no parameters", () => {
    const res = renderToString(<Parameters />);

    expect(res).toBe("");
  });

  it("renders a single parameter as name: Type", () => {
    const res = renderToString(<Parameters parameters={{ name: "String" }} />);

    expect(res).toBe("name: String");
  });

  it("renders a parameter with a default value", () => {
    const res = renderToString(<Parameters parameters={{ x: { type: "Int", default: "0" } }} />);

    expect(res).toBe("x: Int = 0");
  });

  it("renders multiple parameters comma-separated", () => {
    const res = renderToString(<Parameters parameters={{ name: "String", age: "Int" }} />);

    expect(res).toBe("name: String, age: Int");
  });

  it("renders mixed parameters with and without defaults", () => {
    const res = renderToString(
      <Parameters
        parameters={{
          name: "String",
          greeting: { type: "String", default: '"Hello"' },
        }}
      />,
    );

    expect(res).toBe('name: String, greeting: String = "Hello"');
  });

  it("renders a vararg parameter", () => {
    const res = renderToString(<Parameters parameters={{ names: { type: "String", vararg: true } }} />);

    expect(res).toBe("vararg names: String");
  });

  it("renders a vararg parameter with a default value", () => {
    const res = renderToString(
      <Parameters parameters={{ names: { type: "String", vararg: true, default: "arrayOf()" } }} />,
    );

    expect(res).toBe("vararg names: String = arrayOf()");
  });
});
