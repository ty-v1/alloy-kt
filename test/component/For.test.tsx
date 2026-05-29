import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { For } from "../../src/component/For.js";

describe("For", () => {
  it("renders for loop with body", () => {
    const res = renderToString(
      <For parameters="item" iterable="items">
        processItem(item)
      </For>,
    );
    expect(res).toBe(d`
      for (item in items) {
        processItem(item)
      }`);
  });

  it("renders empty for loop", () => {
    const res = renderToString(<For parameters="item" iterable="items" />);
    expect(res).toBe("for (item in items) {}");
  });

  it("renders destructuring declaration", () => {
    const res = renderToString(
      <For parameters="(key, value)" iterable="map">
        process(key, value)
      </For>,
    );
    expect(res).toBe(d`
      for ((key, value) in map) {
        process(key, value)
      }`);
  });

  it("renders withIndex destructuring", () => {
    const res = renderToString(
      <For parameters="(index, element)" iterable="list.withIndex()">
        println(index, element)
      </For>,
    );
    expect(res).toBe(d`
      for ((index, element) in list.withIndex()) {
        println(index, element)
      }`);
  });
});
