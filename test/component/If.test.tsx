import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Else, ElseIf, If } from "../../src/component/If.js";

describe("If", () => {
  it("renders if with block body", () => {
    const res = renderToString(<If condition="x > 0">doSomething()</If>);
    expect(res).toBe(d`
      if (x > 0) {
        doSomething()
      }`);
  });

  it("renders empty if block", () => {
    const res = renderToString(<If condition="flag" />);
    expect(res).toBe("if (flag) {}");
  });
});

describe("ElseIf", () => {
  it("renders else-if chain", () => {
    const res = renderToString(
      <>
        <If condition="x > 0">positive()</If>
        <ElseIf condition="x < 0">negative()</ElseIf>
        <Else>zero()</Else>
      </>,
    );
    expect(res).toBe(d`
      if (x > 0) {
        positive()
      } else if (x < 0) {
        negative()
      } else {
        zero()
      }`);
  });

  it("renders empty else-if block", () => {
    const res = renderToString(
      <>
        <If condition="flag" />
        <ElseIf condition="other" />
      </>,
    );
    expect(res).toBe("if (flag) {} else if (other) {}");
  });
});

describe("Else", () => {
  it("renders else block", () => {
    const res = renderToString(
      <>
        <If condition="flag">doSomething()</If>
        <Else>doDefault()</Else>
      </>,
    );
    expect(res).toBe(d`
      if (flag) {
        doSomething()
      } else {
        doDefault()
      }`);
  });

  it("renders empty else block", () => {
    const res = renderToString(
      <>
        <If condition="flag" />
        <Else />
      </>,
    );
    expect(res).toBe("if (flag) {} else {}");
  });
});
