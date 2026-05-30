import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Object } from "../../src/component/Object.js";
import { renderInTestContext } from "../utils.js";

describe("Object", () => {
  it("renders a simple object declaration without body", () => {
    const res = renderInTestContext(<Object name="Singleton" />);

    expect(res).toContain("object Singleton");
  });

  it("renders an object with a supertype", () => {
    const res = renderInTestContext(<Object name="Config" supertypes={["Serializable"]} />);

    expect(res).toContain("object Config : Serializable");
  });

  it("renders an object with body", () => {
    const res = renderInTestContext(<Object name="Singleton">{"val instance = Singleton"}</Object>);

    expect(res).toContain(d`
      object Singleton {
        val instance = Singleton
      }
    `);
  });

  it("renders an anonymous companion object", () => {
    const res = renderInTestContext(<Object companion />);

    expect(res).toContain("companion object");
    expect(res).not.toContain("companion object Companion");
  });

  it("renders a named companion object", () => {
    const res = renderInTestContext(<Object companion name="Factory" />);

    expect(res).toContain("companion object Factory");
  });

  it("renders a private companion object", () => {
    const res = renderInTestContext(<Object companion private />);

    expect(res).toContain("private companion object");
  });

  it("renders an object with an annotation", () => {
    const res = renderInTestContext(<Object name="Singleton" annotations={[{ type: "Anno" }]} />);

    expect(res).toContain(d`
      @Anno
      object Singleton
    `);
  });
});
