import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { PrimaryConstructor, SecondaryConstructor } from "../../src/component/Constructor.js";

describe("PrimaryConstructor", () => {
  it("renders empty parens when no parameters and no modifier", () => {
    const res = renderToString(<PrimaryConstructor />);

    expect(res).toBe("()");
  });

  it("renders parameters without visibility modifier", () => {
    const res = renderToString(<PrimaryConstructor parameters={{ name: "String", age: "Int" }} />);

    expect(res).toBe("(name: String, age: Int)");
  });

  it("renders private constructor keyword when private modifier is set", () => {
    const res = renderToString(<PrimaryConstructor private parameters={{ id: "Long" }} />);

    expect(res).toBe(" private constructor(id: Long)");
  });

  it("renders internal constructor keyword", () => {
    const res = renderToString(<PrimaryConstructor internal />);

    expect(res).toBe(" internal constructor()");
  });
});

describe("SecondaryConstructor", () => {
  it("renders constructor with body", () => {
    const res = renderToString(<SecondaryConstructor>{"println()"}</SecondaryConstructor>);

    expect(res).toBe("constructor() {\n  println()\n}");
  });

  it("renders constructor with parameters and body", () => {
    const res = renderToString(
      <SecondaryConstructor parameters={{ age: "Int" }}>{"this.age = age"}</SecondaryConstructor>,
    );

    expect(res).toBe("constructor(age: Int) {\n  this.age = age\n}");
  });

  it("renders delegation without body", () => {
    const res = renderToString(<SecondaryConstructor parameters={{ n: "String" }} delegatedParameters="n" />);

    expect(res).toBe("constructor(n: String) : this(n)");
  });
});
