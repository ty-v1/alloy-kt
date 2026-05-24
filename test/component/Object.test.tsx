import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { CompanionObject, KotlinObject } from "../../src/component/Object.js";
import { renderInTestContext } from "../utils.js";

describe("KotlinObject", () => {
  it("renders a simple object declaration", () => {
    const res = renderInTestContext(<KotlinObject name="Singleton" />);

    expect(res).toContain(d`
      object Singleton {}
    `);
  });

  it("renders an object with a supertype", () => {
    const res = renderInTestContext(<KotlinObject name="Config" supertypes={["Serializable"]} />);

    expect(res).toContain(d`
      object Config : Serializable {}
    `);
  });
});

describe("CompanionObject", () => {
  it("renders an unnamed companion object", () => {
    const res = renderToString(<CompanionObject />);

    expect(res).toContain("companion object {}");
  });

  it("renders a named companion object", () => {
    const res = renderToString(<CompanionObject name="Factory" />);

    expect(res).toContain("companion object Factory {}");
  });

  it("renders a companion object with a supertype", () => {
    const res = renderToString(<CompanionObject supertypes={["Builder"]} />);

    expect(res).toContain("companion object : Builder {}");
  });
});
