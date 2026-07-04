import { Children, Output } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { For } from "../../src/component/For.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

function render(children: Children) {
  return renderToString(<Output namePolicy={createKotlinNamePolicy()}>{children}</Output>);
}

describe("For", () => {
  it("renders for loop with body", () => {
    expect(
      render(
        <For variable="item" iterable="items">
          processItem(item)
        </For>,
      ),
    ).toBe(d`
      for (item in items) {
        processItem(item)
      }`);
  });

  it("renders empty for loop", () => {
    expect(render(<For variable="item" iterable="items" />)).toBe("for (item in items) {}");
  });

  it("applies name policy to string parameter", () => {
    expect(render(<For variable="MyItem" iterable="items" />)).toBe("for (myItem in items) {}");
  });

  it("renders destructuring declaration", () => {
    expect(
      render(
        <For variables={[{ name: "key" }, { name: "value" }]} iterable="map">
          process(key, value)
        </For>,
      ),
    ).toBe(d`
      for ((key, value) in map) {
        process(key, value)
      }`);
  });

  it("renders destructuring with type annotations", () => {
    expect(
      render(
        <For
          variables={[
            { name: "key", type: "String" },
            { name: "value", type: "Int" },
          ]}
          iterable="map"
        />,
      ),
    ).toBe("for ((key: String, value: Int) in map) {}");
  });

  it("renders withIndex destructuring", () => {
    expect(
      render(
        <For variables={[{ name: "index" }, { name: "element" }]} iterable="list.withIndex()">
          println(index, element)
        </For>,
      ),
    ).toBe(d`
      for ((index, element) in list.withIndex()) {
        println(index, element)
      }`);
  });

  it("applies name policy to destructuring parameter names", () => {
    expect(
      render(<For variables={[{ name: "MyKey" }, { name: "MyValue" }]} iterable="map" />),
    ).toBe("for ((myKey, myValue) in map) {}");
  });

  it("prefers variables over variable when both are given", () => {
    expect(
      render(
        <For variable="item" variables={[{ name: "key" }, { name: "value" }]} iterable="map" />,
      ),
    ).toBe("for ((key, value) in map) {}");
  });
});
