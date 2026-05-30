import { d, renderToString } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { InitBlock } from "../../src/component/InitBlock.js";

describe("InitBlock", () => {
  it("renders an init block with a single statement", () => {
    const res = renderToString(<InitBlock>{'println("init")'}</InitBlock>);

    expect(res).toBe(d`
      init {
        println("init")
      }
    `);
  });

  it("renders an init block with multiple statements", () => {
    const res = renderToString(
      <InitBlock>
        {"require(count > 0)"}
        <hbr />
        {"name = name.trim()"}
      </InitBlock>,
    );

    expect(res).toBe(d`
      init {
        require(count > 0)
        name = name.trim()
      }
    `);
  });

  it("renders an empty init block", () => {
    const res = renderToString(<InitBlock />);

    expect(res).toBe("init {}");
  });
});
