import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CompanionObject, KotlinObject } from "../../src/component/Object.js";
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

  it("renders an object with an annotation", () => {
    const res = renderInTestContext(<KotlinObject name="Singleton" annotations={[{ type: "Anno" }]} />);

    expect(res).toContain(d`
      @Anno
      object Singleton
    `);
  });
});

describe("CompanionObject", () => {
  it("renders an unnamed companion object without body", () => {
    const res = renderToString(<CompanionObject />);

    expect(res).toBe("companion object");
  });

  it("renders a named companion object without body", () => {
    const res = renderToString(<CompanionObject name="Factory" />);

    expect(res).toBe("companion object Factory");
  });

  it("renders a companion object with a supertype", () => {
    const res = renderToString(<CompanionObject supertypes={["Builder"]} />);

    expect(res).toBe("companion object : Builder");
  });
});
