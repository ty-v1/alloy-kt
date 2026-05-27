import { describe, expect, it } from "vitest";
import { Function } from "../../src/component/Function.js";
import { renderInTestContext } from "../utils.js";

describe("Function", () => {
  it("renders a minimal function", () => {
    const res = renderInTestContext(<Function name="greet" />);

    expect(res).toContain("fun greet()");
  });

  it("renders function with parameters", () => {
    const res = renderInTestContext(<Function name="greet" parameters={{ name: "String" }} />);

    expect(res).toContain("fun greet(name: String)");
  });

  it("renders function with return type", () => {
    const res = renderInTestContext(<Function name="greet" returnType="String" />);

    expect(res).toContain("fun greet(): String");
  });

  it("renders function with block body", () => {
    const res = renderInTestContext(<Function name="greet">println("hello")</Function>);

    expect(res).toContain('fun greet() {\n  println("hello")\n}');
  });

  it("renders expression body", () => {
    const res = renderInTestContext(
      <Function name="double" parameters={{ x: "Int" }} returnType="Int" expressionBody="x * 2" />,
    );

    expect(res).toContain("fun double(x: Int): Int = x * 2");
  });

  it("renders override modifier", () => {
    const res = renderInTestContext(<Function override name="toString" returnType="String" />);

    expect(res).toContain("override fun toString(): String");
  });

  it("renders suspend function", () => {
    const res = renderInTestContext(<Function suspend name="fetch" returnType="Response" />);

    expect(res).toContain("suspend fun fetch(): Response");
  });

  it("renders generic function", () => {
    const res = renderInTestContext(
      <Function
        name="identity"
        generics={{ T: undefined }}
        parameters={{ x: "T" }}
        returnType="T"
        expressionBody="x"
      />,
    );

    expect(res).toContain("fun <T> identity(x: T): T = x");
  });

  it("renders private function", () => {
    const res = renderInTestContext(<Function private name="helper" />);

    expect(res).toContain("private fun helper()");
  });

  it("renders abstract interface method without body", () => {
    const res = renderInTestContext(<Function abstract name="draw" returnType="Unit" />);

    expect(res).toContain("abstract fun draw(): Unit");
  });
});
