import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { ObjectExpression } from "../../src/component/ObjectExpression.js";
import { renderInTestContext } from "../utils.js";

describe("ObjectExpression", () => {
  it("renders anonymous object with no supertypes or body", () => {
    expect(renderToString(<ObjectExpression />)).toBe("object");
  });

  it("renders anonymous object with a single supertype", () => {
    expect(renderToString(<ObjectExpression supertypes={["Runnable"]} />)).toBe(
      "object : Runnable",
    );
  });

  it("renders anonymous object with multiple supertypes", () => {
    expect(renderToString(<ObjectExpression supertypes={["Runnable", "Closeable"]} />)).toBe(
      "object : Runnable, Closeable",
    );
  });

  it("renders anonymous object with supertype and body", () => {
    const res = renderInTestContext(
      <ObjectExpression supertypes={["Runnable"]}>{"override fun run() {}"}</ObjectExpression>,
    );

    expect(res).toContain(d`
      object : Runnable {
        override fun run() {}
      }
    `);
  });

  it("renders anonymous object with body and no supertypes", () => {
    const res = renderToString(
      <ObjectExpression>{"val x = 1"}</ObjectExpression>,
    );

    expect(res).toBe(d`
      object {
        val x = 1
      }
    `);
  });
});
