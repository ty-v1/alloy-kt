import { Children, Output } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { DestructuringVariable } from "../../src/component/DestructuringVariable.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

function render(children: Children) {
  return renderToString(<Output namePolicy={createKotlinNamePolicy()}>{children}</Output>);
}

describe("DestructuringVariable", () => {
  it("renders val with type annotations", () => {
    expect(
      render(
        <DestructuringVariable
          val
          variables={[
            { name: "firstName", type: "String" },
            { name: "age", type: "Int" },
          ]}
          initialValue="person"
        />,
      ),
    ).toBe("val (firstName: String, age: Int) = person");
  });

  it("renders val without type annotations", () => {
    expect(
      render(
        <DestructuringVariable val variables={[{ name: "x" }, { name: "y" }]} initialValue="point" />,
      ),
    ).toBe("val (x, y) = point");
  });

  it("defaults to val when neither val nor var is set", () => {
    expect(
      render(<DestructuringVariable variables={[{ name: "a" }, { name: "b" }]} initialValue="pair" />),
    ).toBe("val (a, b) = pair");
  });

  it("renders var keyword", () => {
    expect(
      render(
        <DestructuringVariable var variables={[{ name: "x" }, { name: "y" }]} initialValue="point" />,
      ),
    ).toBe("var (x, y) = point");
  });

  it("renders mixed variables with and without type annotations", () => {
    expect(
      render(
        <DestructuringVariable
          val
          variables={[{ name: "name", type: "String" }, { name: "age" }]}
          initialValue="person"
        />,
      ),
    ).toBe("val (name: String, age) = person");
  });

  it("applies name policy to variable names", () => {
    expect(
      render(
        <DestructuringVariable
          val
          variables={[{ name: "FirstName" }, { name: "LastName" }]}
          initialValue="person"
        />,
      ),
    ).toBe("val (firstName, lastName) = person");
  });

  it("renders without initialValue", () => {
    expect(
      render(<DestructuringVariable val variables={[{ name: "a" }, { name: "b" }]} />),
    ).toBe("val (a, b)");
  });
});
