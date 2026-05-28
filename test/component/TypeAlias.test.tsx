import { Children, Output } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { LexicalScope } from "../../src/component/LexicalScope.js";
import { TypeAlias } from "../../src/component/TypeAlias.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

function render(children: Children) {
  return renderToString(
    <Output namePolicy={createKotlinNamePolicy()}>
      <LexicalScope name="test">{children}</LexicalScope>
    </Output>,
  );
}

describe("TypeAlias", () => {
  it("renders a simple typealias", () => {
    expect(render(<TypeAlias name="StringList" type="List<String>" />)).toBe("typealias StringList = List<String>");
  });

  it("renders internal typealias", () => {
    expect(render(<TypeAlias internal name="StringList" type="List<String>" />)).toBe(
      "internal typealias StringList = List<String>",
    );
  });

  it("renders a generic typealias", () => {
    expect(render(<TypeAlias name="Transformer" generics={{ T: undefined }} type="(T) -> T" />)).toBe(
      "typealias Transformer<T> = (T) -> T",
    );
  });
});
