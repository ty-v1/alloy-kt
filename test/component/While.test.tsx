import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { DoWhile, While } from "../../src/component/While.js";

describe("While", () => {
  it("renders while loop with body", () => {
    const res = renderToString(<While condition="x > 0">doSomething()</While>);
    expect(res).toBe(d`
      while (x > 0) {
        doSomething()
      }`);
  });

  it("renders empty while loop", () => {
    const res = renderToString(<While condition="running" />);
    expect(res).toBe("while (running) {}");
  });
});

describe("DoWhile", () => {
  it("renders do-while loop with body", () => {
    const res = renderToString(<DoWhile condition="x > 0">doSomething()</DoWhile>);
    expect(res).toBe(d`
      do {
        doSomething()
      } while (x > 0)`);
  });

  it("renders empty do-while loop", () => {
    const res = renderToString(<DoWhile condition="flag" />);
    expect(res).toBe("do {} while (flag)");
  });
});
