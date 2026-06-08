import { mapJoin } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Enum, EnumMember } from "../../src/component/Enum.js";
import { renderInTestContext } from "../utils.js";

describe("Enum", () => {
  it("renders a minimal enum class without body", () => {
    const res = renderInTestContext(<Enum name="Color" />);

    expect(res).toContain("enum class Color");
  });

  it("renders an enum class with members", () => {
    const members = mapJoin(
      () => ["RED", "GREEN", "BLUE"],
      (name) => <EnumMember name={name} />,
      { joiner: ", " },
    );
    const res = renderInTestContext(<Enum name="Color">{members}</Enum>);

    expect(res).toContain(d`
      enum class Color {
        RED, GREEN, BLUE
      }
    `);
  });

  it("renders an enum member with args", () => {
    const res = renderInTestContext(
      <Enum name="Planet" primaryConstructor={{ parameters: { mass: "Double" } }}>
        <EnumMember name="EARTH" args={["5.972e+24"]} />
      </Enum>,
    );

    expect(res).toContain(d`
      enum class Planet(mass: Double) {
        EARTH(5.972e+24)
      }
    `);
  });

  it("renders external enum class", () => {
    const res = renderInTestContext(<Enum external name="Color" />);

    expect(res).toContain("external enum class Color");
  });
});

describe("EnumMember", () => {
  it("applies CONSTANT_CASE to the name", () => {
    const res = renderInTestContext(
      <Enum name="Status">
        <EnumMember name="someValue" />
      </Enum>,
    );

    expect(res).toContain("SOME_VALUE");
  });

  it("renders an enum class with an annotation", () => {
    const res = renderInTestContext(<Enum name="Color" annotations={[{ type: "Anno" }]} />);

    expect(res).toContain(d`
      @Anno
      enum class Color
    `);
  });
});
