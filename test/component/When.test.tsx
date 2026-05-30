import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { When } from "../../src/component/When.js";

describe("When", () => {
  it("renders when with subject", () => {
    const res = renderToString(
      <When
        subject="x"
        entries={[
          { condition: "1", body: "one()" },
          { condition: "2", body: "two()" },
          { else: true, body: "other()" },
        ]}
      />,
    );

    expect(res).toBe(d`
      when (x) {
        1 -> one()
        2 -> two()
        else -> other()
      }`);
  });

  it("renders when without subject", () => {
    const res = renderToString(
      <When
        entries={[
          { condition: "x > 0", body: "positive()" },
          { else: true, body: "other()" },
        ]}
      />,
    );

    expect(res).toBe(d`
      when {
        x > 0 -> positive()
        else -> other()
      }
    `);
  });

  it("renders when with single entry", () => {
    const res = renderToString(<When subject="status" entries={[{ else: true, body: "handle()" }]} />);

    expect(res).toBe(d`
      when (status) {
        else -> handle()
      }`);
  });
});
