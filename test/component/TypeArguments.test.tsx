import { renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { TypeArguments } from "../../src/component/TypeArguments.js";

describe("TypeArguments", () => {
  it("renders a star projection", () => {
    const res = renderToString(<TypeArguments args={[{ star: true }]} />);

    expect(res).toBe("<*>");
  });

  it("renders a named type argument", () => {
    const res = renderToString(<TypeArguments args={[{ name: "String" }]} />);

    expect(res).toBe("<String>");
  });

  it("renders multiple named type arguments", () => {
    const res = renderToString(<TypeArguments args={[{ name: "String" }, { name: "Int" }]} />);

    expect(res).toBe("<String, Int>");
  });

  it("renders out variance projection", () => {
    const res = renderToString(<TypeArguments args={[{ variance: "out", type: "Number" }]} />);

    expect(res).toBe("<out Number>");
  });

  it("renders in variance projection", () => {
    const res = renderToString(<TypeArguments args={[{ variance: "in", type: "String" }]} />);

    expect(res).toBe("<in String>");
  });

  it("renders named and star", () => {
    const res = renderToString(<TypeArguments args={[{ name: "K" }, { star: true }]} />);

    expect(res).toBe("<K, *>");
  });

  it("renders shorthand", () => {
    const res = renderToString(<TypeArguments args={["String", "Int"]} />);

    expect(res).toBe("<String, Int>");
  });

  it("renders nothing when args is omitted", () => {
    const res = renderToString(<TypeArguments />);

    expect(res).toBe("");
  });

  it("renders nothing when args is empty", () => {
    const res = renderToString(<TypeArguments args={[]} />);

    expect(res).toBe("");
  });

  it("renders nested type arguments", () => {
    const res = renderToString(
      <TypeArguments
        args={[
          { name: "String" },
          {
            name: (
              <>
                List
                <TypeArguments args={[{ name: "Int" }]} />
              </>
            ),
          },
        ]}
      />,
    );

    expect(res).toBe("<String, List<Int>>");
  });
});
