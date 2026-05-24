import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Interface } from "../../src/component/Interface.js";
import { renderInTestContext } from "../utils.js";

describe("Interface", () => {
  it("renders a minimal interface", () => {
    const res = renderInTestContext(<Interface name="Foo" />);

    expect(res).toContain(d`
      interface Foo {}
    `);
  });

  it("renders a generic interface", () => {
    const res = renderInTestContext(<Interface name="Comparable" generics={{ T: undefined }} />);

    expect(res).toContain(d`
      interface Comparable<T> {}
    `);
  });

  it("renders a fun interface", () => {
    const res = renderInTestContext(<Interface fun name="Runnable" />);

    expect(res).toContain(d`
      fun interface Runnable {}
    `);
  });

  it("renders an interface extending one interface", () => {
    const res = renderInTestContext(<Interface name="Bar" extends={["Foo"]} />);

    expect(res).toContain(d`
      interface Bar : Foo {}
    `);
  });

  it("renders an interface extending two interfaces", () => {
    const res = renderInTestContext(<Interface name="Bar" extends={["Foo", "Baz"]} />);

    expect(res).toContain(d`
      interface Bar : Foo, Baz {}
    `);
  });
});
