import { renderToString } from "@alloy-js/core/testing";
import { ImportStatement } from "../../src/component/ImportStatement.jsx";
import { SemicolonPolicy } from "../../src/context/useSemicolonPolicy.js";

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

  it("renders with semicolon when policy is set", () => {
    const res = renderToString(
      <SemicolonPolicy.Provider value={{ semicolon: true }}>
        <ImportStatement name="String" package="java.lang" />
      </SemicolonPolicy.Provider>,
    );

    expect(res).toBe("import java.lang.String;");
  });

  it("renders wildcard with semicolon", () => {
    const res = renderToString(
      <SemicolonPolicy.Provider value={{ semicolon: true }}>
        <ImportStatement name="String" package="java.lang" wildcard />
      </SemicolonPolicy.Provider>,
    );

    expect(res).toBe("import java.lang.*;");
  });
});
