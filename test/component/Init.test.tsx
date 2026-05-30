import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Init } from "../../src/component/Init.js";

describe("InitBlock", () => {
  it("renders an init block with a single statement", () => {
    const res = renderToString(<Init>{'println("init")'}</Init>);

    expect(res).toBe(d`
      init {
        println("init")
      }
    `);
  });

  it("renders an init block with multiple statements", () => {
    const res = renderToString(
      <Init>
        {"require(count > 0)"}
        <hbr />
        {"name = name.trim()"}
      </Init>,
    );

    expect(res).toBe(d`
      init {
        require(count > 0)
        name = name.trim()
      }
    `);
  });

  it("renders an empty init block", () => {
    const res = renderToString(<Init />);

    expect(res).toBe("init {}");
  });
});
