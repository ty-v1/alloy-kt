import { renderToString } from "@alloy-js/core/testing";
import { ImportStatement } from "../../src/component/ImportStatement.jsx";

describe("ImportStatement", () => {
  it("renders with default props", () => {
    const res = renderToString(<ImportStatement name="String" package="java.lang" />);

    expect(res).toBe("import java.lang.String");
  });

  it("renders a wildcard import", () => {
    const res = renderToString(<ImportStatement name="String" package="java.lang" wildcard />);

    expect(res).toBe("import java.lang.*");
  });

  it("renders an import with alias", () => {
    const res = renderToString(<ImportStatement name="String" package="java.lang" alias="jString" />);

    expect(res).toBe("import java.lang.String as jString");
  });
});
