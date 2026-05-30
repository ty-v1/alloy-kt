import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { KotlinObject } from "../../src/component/Object.js";
import { renderInTestContext } from "../utils.js";

describe("KotlinObject", () => {
  it("renders a simple object declaration without body", () => {
    const res = renderInTestContext(<KotlinObject name="Singleton" />);

    expect(res).toContain("object Singleton");
  });

  it("renders an object with a supertype", () => {
    const res = renderInTestContext(<KotlinObject name="Config" supertypes={["Serializable"]} />);

    expect(res).toContain("object Config : Serializable");
  });

  it("renders an object with body", () => {
    const res = renderInTestContext(<KotlinObject name="Singleton">{"val instance = Singleton"}</KotlinObject>);

    expect(res).toContain(d`
      object Singleton {
        val instance = Singleton
      }
    `);
  });

  it("renders an anonymous companion object", () => {
    const res = renderInTestContext(<KotlinObject companion />);

    expect(res).toContain("companion object");
    expect(res).not.toContain("companion object Companion");
  });

  it("renders a named companion object", () => {
    const res = renderInTestContext(<KotlinObject companion name="Factory" />);

    expect(res).toContain("companion object Factory");
  });

  it("renders a private companion object", () => {
    const res = renderInTestContext(<KotlinObject companion private />);

    expect(res).toContain("private companion object");
  });

  it("renders an object with an annotation", () => {
    const res = renderInTestContext(<KotlinObject name="Singleton" annotations={[{ type: "Anno" }]} />);

    expect(res).toContain(d`
      @Anno
      object Singleton
    `);
  });
});
