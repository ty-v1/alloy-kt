import { Children, Output } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { LexicalScope } from "../../src/component/LexicalScope.js";
import { Property } from "../../src/component/Property.js";
import { createKotlinNamePolicy } from "../../src/context/createKotlinNamePolicy.js";

function render(children: Children) {
  return renderToString(
    <Output namePolicy={createKotlinNamePolicy()}>
      <LexicalScope name="test">{children}</LexicalScope>
    </Output>,
  );
}

describe("Property", () => {
  it("renders var", () => {
    expect(render(<Property var name="count" type="Int" />)).toBe("var count: Int");
  });

  it("renders val", () => {
    expect(render(<Property val name="name" type="String" />)).toBe("val name: String");
  });

  it("renders with an initial value", () => {
    expect(render(<Property var name="count" type="Int" initialValue="0" />)).toBe("var count: Int = 0");
  });

  it("renders private val", () => {
    expect(render(<Property private val name="id" type="Long" />)).toBe("private val id: Long");
  });

  it("renders const val", () => {
    expect(render(<Property const val name="MAX_SIZE" type="Int" initialValue="100" />)).toBe(
      "const val MAX_SIZE: Int = 100",
    );
  });

  it("renders lateinit var", () => {
    expect(render(<Property lateinit var name="handler" type="Handler" />)).toBe("lateinit var handler: Handler");
  });

  it("renders override val", () => {
    expect(render(<Property override val name="size" type="Int" initialValue="0" />)).toBe(
      "override val size: Int = 0",
    );
  });

  it("renders a property with an annotation", () => {
    expect(render(<Property val name="bar" type="String" annotations={[{ type: "JvmField" }]} />)).toBe(
      d`
        @JvmField
        val bar: String
        `,
    );
  });

  it("renders external property", () => {
    expect(render(<Property external val name="count" type="Int" />)).toBe("external val count: Int");
  });


  it("renders delegated val", () => {
    expect(render(<Property val name="value" type="String" by="delegate" />)).toBe(
      "val value: String by delegate",
    );
  });

  it("renders delegated var with modifier", () => {
    expect(render(<Property private var name="config" type="Config" by="ConfigDelegate()" />)).toBe(
      "private var config: Config by ConfigDelegate()",
    );
  });
});
