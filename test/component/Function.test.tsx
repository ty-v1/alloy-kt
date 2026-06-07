import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Function } from "../../src/component/Function.js";

describe("Function", () => {
  it("renders a minimal function", () => {
    const res = renderToString(<Function name="greet" />);

    expect(res).toBe("fun greet()");
  });

  it("renders function with parameters", () => {
    const res = renderToString(<Function name="greet" parameters={{ name: "String" }} />);

    expect(res).toBe("fun greet(name: String)");
  });

  it("renders function with return type", () => {
    const res = renderToString(<Function name="greet" returnType="String" />);

    expect(res).toBe("fun greet(): String");
  });

  it("renders function with block body", () => {
    const res = renderToString(<Function name="greet">println("hello")</Function>);

    expect(res).toBe('fun greet() {\n  println("hello")\n}');
  });

  it("renders expression body", () => {
    const res = renderToString(
      <Function name="double" parameters={{ x: "Int" }} returnType="Int" expressionBody="x * 2" />,
    );

    expect(res).toBe("fun double(x: Int): Int = x * 2");
  });

  it("renders override modifier", () => {
    const res = renderToString(<Function override name="toString" returnType="String" />);

    expect(res).toBe("override fun toString(): String");
  });

  it("renders suspend function", () => {
    const res = renderToString(<Function suspend name="fetch" returnType="Response" />);

    expect(res).toBe("suspend fun fetch(): Response");
  });

  it("renders generic function", () => {
    const res = renderToString(
      <Function
        name="identity"
        generics={{ T: undefined }}
        parameters={{ x: "T" }}
        returnType="T"
        expressionBody="x"
      />,
    );

    expect(res).toBe("fun <T> identity(x: T): T = x");
  });

  it("renders private function", () => {
    const res = renderToString(<Function private name="helper" />);

    expect(res).toBe("private fun helper()");
  });

  it("renders expect function", () => {
    const res = renderToString(<Function expect name="helper" />);

    expect(res).toBe("expect fun helper()");
  });

  it("renders actual function", () => {
    const res = renderToString(<Function actual name="helper" />);

    expect(res).toBe("actual fun helper()");
  });

  it("renders abstract interface method without body", () => {
    const res = renderToString(<Function abstract name="draw" returnType="Unit" />);

    expect(res).toBe("abstract fun draw(): Unit");
  });
});
