import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Class } from "../../src/component/Class.js";
import { renderInTestContext } from "../utils.js";

describe("Class", () => {
  it("renders a minimal class without body", () => {
    const res = renderInTestContext(<Class name="Foo" />);

    expect(res).toBe(d`
      package me.test.code

      class Foo
    `);
  });

  it("renders a class with body", () => {
    const res = renderInTestContext(<Class name="Foo">{"val x: Int = 0"}</Class>);

    expect(res).toBe(d`
      package me.test.code

      class Foo {
        val x: Int = 0
      }
    `);
  });

  it("renders a data class without body", () => {
    const res = renderInTestContext(<Class data name="Person" />);

    expect(res).toBe(d`
      package me.test.code

      data class Person
    `);
  });

  it("renders a sealed class without body", () => {
    const res = renderInTestContext(<Class sealed name="Result" />);

    expect(res).toBe(d`
      package me.test.code

      sealed class Result
    `);
  });

  it("renders a class with generic type parameters", () => {
    const res = renderInTestContext(<Class name="Box" generics={{ T: undefined }} />);

    expect(res).toBe(d`
      package me.test.code

      class Box<T>
    `);
  });

  it("renders a class with a primary constructor", () => {
    const res = renderInTestContext(
      <Class name="Person" primaryConstructor={{ parameters: { name: "String", age: "Int" } }} />,
    );

    expect(res).toBe(d`
      package me.test.code

      class Person(name: String, age: Int)
    `);
  });

  it("renders a public open class", () => {
    const res = renderInTestContext(<Class public open name="Base" />);

    expect(res).toBe(d`
      package me.test.code

      public open class Base
    `);
  });

  it("renders a value class", () => {
    const res = renderInTestContext(
      <Class value name="Wrapper" primaryConstructor={{ parameters: { value: "Int" } }} />,
    );

    expect(res).toBe(d`
      package me.test.code

      value class Wrapper(value: Int)
    `);
  });
});
