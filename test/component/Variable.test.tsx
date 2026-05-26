import { Children, Output } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Variable } from "../../src/component/Variable.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

function render(children: Children) {
  return renderToString(<Output namePolicy={createKotlinNamePolicy()}>{children}</Output>);
}

describe("Variable", () => {
  it("renders var with type and initializer", () => {
    expect(render(<Variable var name="count" type="Int" initialValue="0" />)).toBe("var count: Int = 0");
  });

  it("renders val with type and initializer", () => {
    expect(render(<Variable val name="name" type="String" initialValue={'"alice"'} />)).toBe(
      'val name: String = "alice"',
    );
  });

  it("omits the type when only initialValue is provided", () => {
    expect(render(<Variable val name="x" initialValue="42" />)).toBe("val x = 42");
  });

  it("renders just the type when no initializer is provided", () => {
    expect(render(<Variable var name="buf" type="ByteArray" />)).toBe("var buf: ByteArray");
  });
});
